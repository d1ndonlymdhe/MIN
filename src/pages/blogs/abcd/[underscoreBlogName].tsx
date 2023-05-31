import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client"


import { remark } from 'remark'
import html from 'remark-html'


export default function Post(props: any) {
    const blog = props.content as string;
    // console.log(blog)
    return <div className="w-screen flex justify-center">
        <div className="blogContent prose w-full md:w-[50vw]" dangerouslySetInnerHTML={{ __html: blog }} />
    </div>
}


export const getServerSideProps: GetServerSideProps<
    any,
    { underscoreBlogName: string }
> = async (context) => {
    const underScoreBlogName = context.params?.underscoreBlogName;
    const token = context.req.cookies.token;
    const prisma = new PrismaClient();
    let loggedIn = false;
    let username: string | undefined;
    let userId: string | undefined;
    if (token) {
        const dbToken = await prisma.token.findFirst({
            where: { value: token },
            include: { user: true },
        });
        if (dbToken) {
            loggedIn = true;
            (username = dbToken.user.username), (userId = dbToken.userId);
        }
    }
    if (underScoreBlogName) {
        const blogName = underScoreBlogName.split("_").join(" ").toLocaleLowerCase();
        const blog = await prisma.blog.findFirst({
            where: { AND: [{ titleLowered: blogName }, { isTemp: false }] },
            include: { author: true },
        });

        console.log("here")
        if (blog) {
            const processedContent = await remark().use(html).process(blog.content)
            const comments = await prisma.comment.findMany({
                where: { blogId: blog.id },
                include: {
                    author: true,
                },
            });
            const reactions = await prisma.blogReaction.findMany({
                where: {
                    blogId: blog.id,
                },
            });
            //find all comment reactions
            const commentReactions = await prisma.commentReaction.findMany({
                where: {
                    commentId: { in: comments.map((r) => r.id) },
                },
            });
            return {
                props: {
                    author: blog.author.name,
                    content: processedContent.toString(),
                    blog: {
                        authorId: blog.authorId,
                        content: blog.content,
                        id: blog.id,
                        title: blog.title,
                    },
                    reactions,
                    comments: comments.map((c) => {
                        return {
                            author: c.author.name,
                            authorId: c.authorId,
                            blogId: c.blogId,
                            content: c.content,
                            id: c.id,
                            reactions: commentReactions.filter((r) => r.commentId == c.id),
                        };
                    }),
                    loggedIn,
                    userId: userId || "",
                    username: username || "",
                    isLiked: reactions.filter((r) => {
                        return r.userId == userId;
                    })[0]?.type
                        ? true
                        : false,
                },
            };
        }
    }
    return {
        redirect: {
            destination: "/blogs/error",
            permanent: false,
        },
    };
};
