import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client"


import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from "remark-gfm";
// import './blog.css';
// import styles from "[underscoreBlogName].module.css";
export default function Post(props: any) {
    const blog = props.content as string;
    const author = props.author;
    const publishedOn = props.blog.publishedOn;
    const comments = props.comments;
    const title = props.blog.title as string;
    const blogId = props.blog.id;
    const authorId = props.blog.authorId;
    // console.log(author, publishedOn, comments);
    // const author = props.
    // console.log(blog)

    return <>
        <div className="w-screen flex justify-center py-4 text-minWhite">
            <div className="md:w-fit flex flex-col">
                <p className="text-6xl font-primary  text-left">
                    {title}
                </p>
                <div className="flex text-4xl font-primary  pl-4 mt-5">
                    <p>
                        - {author}
                    </p>
                </div>
                <div className="h-1 w-[100%] bg-slate-800 rounded-full my-5">
                </div>

                <p className="w-[50vw] md:w-[40vw]">
                    <img src={getBlogImage(blogId)} className="rounded-md"></img>
                </p>
                {/* <div className="w-full flex justify-center my-4"> */}
                <div className="h-1 w-[100%] bg-slate-800 rounded-full my-5">
                </div>
                {/* </div> */}
                {/* <div className="blogContent  prose w-full md:w-[50vw]" dangerouslySetInnerHTML={{ __html: blog }} /> */}
                <Blog content={blog}></Blog>

            </div>
        </div>
    </>
}


function Blog(props: { content: string }) {
    return <>
        <div className="blogContent prose w-full md:w-[50vw]" dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </>
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
            const processedContent = await remark().use(remarkGfm).use(html).process(blog.content)
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
                        publishedOn: blog.publishedOn
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

export function getBlogImage(blogId: string) {
    const bucketname = "my-bucket";
    const bucketUrl = "http://localhost:9444"
    return `${bucketUrl}/${bucketname}/${blogId}.jpg`;
    // return `/api/getBlogImage?blogId=${blogId}`
}

export function getBlogContentImage(blogId: string, imageId: string) {
    const bucketname = "my-bucket";
    const bucketUrl = "http://localhost:9444";
    return `${bucketUrl}/${bucketname}/${blogId}/${imageId}.jpg`;
}