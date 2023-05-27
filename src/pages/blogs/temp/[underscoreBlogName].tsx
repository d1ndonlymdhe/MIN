import { HandThumbUpIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as HandThumbUpIconOutline } from "@heroicons/react/24/outline"
import {
    Blog,
    BlogReaction,
    Comment,
    CommentReaction,
    PrismaClient
} from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import uuid from "react-uuid";
import Button from "../../../globalComponents/Button";
import { trpc } from "../../../utils/trpc";
import BlogRenderer from "../../../globalComponents/BlogRenderer";
import ModalWithBackdrop from "../../../globalComponents/ModalWithBackdrop";
export default function Main(props: PageProps) {
    const { blog, loggedIn, author, comments, reactions, isLiked: liked, userId, username } = props
    const publishMutation = trpc.blog.publishBlog.useMutation({
        onSuccess:(data)=>{
            window.location.href= `/blogs/${data.blog.titleLowered.replaceAll(" ","_")}`
        }
    })
    const deleteMutation = trpc.blog.deleteBlog.useMutation({
        onSuccess: (data) => {
            window.location.href = "/admin"
        }
    })
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [publishWarning, setPublishWarning] = useState(false)
    const [modalShown, setModalShown] = useState(false);
    const DeleteWarning = () => {
        return <ModalWithBackdrop isShown={deleteWarning} title="Are you sure?" onClick={() => {
            if (!deleteMutation.isLoading) {
                setDeleteWarning(false)
            }
        }}>
            <p>All changes will be PERMANENTLY deleted.</p>
            <div className="flex justify-end">
                <div className="flex flex-row gap-4">
                    <Button className="bg-red-400" onClick={() => {
                        if (!deleteMutation.isLoading) {
                            console.log("delete mutating")
                            deleteMutation.mutate({ blogId: blog.id })
                        }
                    }}>{deleteMutation.isLoading && "Loading" || "DELETE"}</Button>
                    <Button className="bg-secondary" onClick={() => {
                        if (!deleteMutation.isLoading) {
                            setDeleteWarning(false);
                        }
                    }}>Cancel</Button>
                </div>
            </div>
        </ModalWithBackdrop>
    }
    const PublishWarning = () => {
        return <ModalWithBackdrop isShown={publishWarning} title="Are you sure?" onClick={() => {
            if (!publishMutation.isLoading) {
                setPublishWarning(false)
            }
        }}>
            <p>All changes will be published.</p>
            <div className="flex justify-end">
                <div className="flex flex-row gap-4">
                    <Button className="bg-secondary" onClick={() => {
                        if (!publishMutation.isLoading) {
                            console.log("mutating")
                            publishMutation.mutate({ blogId: blog.id })
                        }
                    }}>{publishMutation.isLoading && "Loading" || "Publish"}</Button>
                    <Button className="bg-secondary" onClick={() => {
                        if (!publishMutation.isLoading) {
                            setPublishWarning(false)
                        }
                    }}>Cancel</Button>
                </div>
            </div>
        </ModalWithBackdrop>
    }
    return <div>
        <main className="w-screen min-h-screen bg-primary text-white">
            <TopBar></TopBar>
            <div className="h-full w-full py-2 px-2 grid grid-flow-rows md:grid-cols-[6fr_4fr] gap-4">
                <div className="w-full min-h-[85vh]  grid place-items-center">
                    <div className="h-fit w-fit">
                        <BlogRenderer blog={blog}></BlogRenderer>
                    </div>
                </div>
                <div className="flex flex-row gap-4 h-fit w-fit">
                    {publishWarning && <PublishWarning></PublishWarning>}
                    <Button className="bg-secondary" onClick={() => {
                        if (!publishMutation.isLoading) {
                            setPublishWarning(true)
                        }
                    }}>Publish</Button>
                    {/* TODO href to admin and add extra serversideprops for editing */}
                    <a href={`/admin?editThis=${blog.id}`} target="_blank"><Button className="bg-secondary">Edit</Button></a>
                    {deleteWarning && <DeleteWarning></DeleteWarning>}
                    <Button className="bg-secondary" onClick={() => {
                        if (!deleteMutation.isLoading) {
                            setDeleteWarning(true)
                        }
                    }}>Delete</Button>
                </div>
            </div>
        </main>
    </div>


}

function TopBar() {
    return (
        <div className="text-md grid h-[10vh] w-screen grid-cols-3 place-items-center gap-2 border-b-8 border-complementary md:grid-cols-[2fr_6fr_2fr] md:text-4xl">
            <div className="place-items-center text-center font-primary  font-bold">
                MIN
            </div>
            <div className="w-full place-items-center text-center font-complementry ">

            </div>
            <div className="grid w-full  place-items-end justify-end gap-2">
                <UserCircleIcon className="mr-2 h-8 w-8"></UserCircleIcon>
            </div>
        </div>
    )
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
    if (token && underScoreBlogName) {
        const dbToken = await prisma.token.findFirst({
            where: { value: token },
            include: { user: true },
        });
        if (dbToken) {
            loggedIn = true;
            (username = dbToken.user.username), (userId = dbToken.userId);
            const blogName = underScoreBlogName.split("_").join(" ").toLocaleLowerCase();
            const blog = await prisma.blog.findFirst({
                where: { AND: [{ titleLowered: blogName }, { isTemp: true }] },
                include: { author: true },
            });
            if (blog) {
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
    }
    return {
        redirect: {
            destination: "/blogs/error",
            permanent: false,
        },
    };
};
