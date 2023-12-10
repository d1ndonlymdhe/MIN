import { HandThumbUpIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline"
import html from 'remark-html'
import {
    Blog,
    BlogReaction,
    Comment,
    CommentReaction,
    PrismaClient
} from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";
import Button from "../../../globalComponents/Button";
import { trpc } from "../../../utils/trpc";
import ModalWithBackdrop from "../../../globalComponents/ModalWithBackdrop";
import { getBlogImage } from "../[underscoreBlogName]";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import Navbar from "../../../globalComponents/Navbar";


export default function Post(props: any) {
    const blog = props.content as string;
    const author = props.author;
    const publishedOn = props.blog.publishedOn;
    const title = props.blog.title as string;
    const blogId = props.blog.id;
    const [modalShown, setModalShown] = useState(false);
    const [publishModal, setPublishModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const publishMutation = trpc.blog.publishBlog.useMutation({
        onSettled: () => {
            setModalShown(false);
            setPublishModal(false);
        }
        ,
        onSuccess: (data) => {
            window.location.href = `localhost:3000/blogs/${data.blog.titleLowered.replace(" ", "_")}`
        }
    })
    const deleteMutation = trpc.blog.deleteBlog.useMutation({
        onSettled: () => {
            setModalShown(false);
            setPublishModal(false);
        }
        ,
        onSuccess: (data) => {
            window.location.href = `localhost:3000/admin`;
        }
    })
    // const 
    return <div className={`${modalShown ? "h-[100vh] overflow-hidden" : ""}`}>
        <ModalWithBackdrop isShown={publishModal} title="Publish Modal?" onClick={() => {
            setModalShown(false);
            setPublishModal(false)
        }}>
            <p className="text-white">
                Are you sure you want to publish this blog?
            </p>
            <div className="flex flex-row gap-4 w-full justify-end">
                <Button className="bg-green-400" onClick={() => {
                    if (!publishMutation.isLoading) {
                        publishMutation.mutate({
                            blogId: blogId
                        })
                    }
                }}> {
                        publishMutation.isLoading && "Loading" || "YES"
                    }</Button>
                <Button className="bg-red-400" onClick={() => {
                    setPublishModal(false)
                    setModalShown(false)
                }}>No</Button>
            </div>
        </ModalWithBackdrop>
        <ModalWithBackdrop isShown={deleteModal} title="Delete Modal?">
            <p className="text-white">
                Are you sure you want to publish this blog?
            </p>
            <div className="flex flex-row gap-4 w-full justify-end">
                <Button className="bg-green-400" onClick={() => {
                    if (!deleteMutation.isLoading) {
                        deleteMutation.mutate({
                            blogId: blogId
                        })
                    }
                }}> {
                        deleteMutation.isLoading && "Loading" || "YES"
                    }</Button>
                <Button className="bg-red-400" onClick={() => {
                    setDeleteModal(false)
                    setModalShown(false)
                }}>No</Button>
            </div>
        </ModalWithBackdrop>
        <div className={`${modalShown && "h-screen w-screen overflow-hidden"}`}>
            <Navbar setModalShown={setModalShown} activeTab="Blogs"></Navbar>
            <div className="w-full h-fit flex flex-col items-center my-10 text-white gap-5">
                <div className="flex flex-row items-center justify-center text-white text-[6rem] font-primary font-[700] w-[90vw] lg:w-[60vw] h-[50vh] rounded-md" style={{
                    backgroundImage: `url(${getBlogImage(blogId)})`,
                    backgroundSize: "cover"
                }}>
                    <p>
                        {title}
                    </p>
                </div>
                <div className="w-[90vw] lg:w-[60vw] flex gap-2 items-center font-inter text-xl">
                    <p className="text-[#FFB700]">
                        {author}
                    </p>
                    <p>
                        {/* {ps} */}
                        {(new Date(Number(publishedOn)).toDateString())}
                        {/* {new Date(publishedOn).toDateString()} */}
                    </p>
                </div>
                <div className="w-[90vw] lg:w-[60vw]">
                    <Blog content={blog}></Blog>
                </div>
                <div className="flex gap-10 text-2xl">
                    <Button className="bg-secondary p-4" onClick={() => { setPublishModal(true); setModalShown(true) }}>
                        PUBLISH
                    </Button>
                    <Button className="bg-red-400 p-4" onClick={() => { setDeleteModal(true); setModalShown(true) }}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    </div>
}


function Blog(props: { content: string }) {
    return <>
        <div className="blogContent prose" dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </>
}





type ClientComment = Comment & {
    author: string;
    reactions: CommentReaction[];
};
type PageProps = {
    loggedIn: boolean;
    blog: Blog;
    reactions: BlogReaction[];
    author: string;
    comments: ClientComment[];
    userId?: string;
    username?: string;
    isLiked?: boolean;
};
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
            where: { AND: [{ titleLowered: blogName }, { isTemp: true }] },
            include: { author: true },
        });

        console.log("here")
        if (blog) {
            const processedContent = await remark().use(remarkGfm).use(html).process(blog.content)
            const comments = await prisma.comment.findMany({
                where: { blogId: blog.id },
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

