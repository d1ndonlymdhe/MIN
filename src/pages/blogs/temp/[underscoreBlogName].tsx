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
export default function Main2(props: PageProps) {
    const { blog, loggedIn, author, comments, reactions, isLiked: liked, userId, username } = props
    const [isLiked, setIsLiked] = useState(liked);
    const [likeCount, setLikeCount] = useState(
        reactions.filter(r => r.type).length
    )
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

    const DeleteWarning = () => {
        return <ModalWithBackdrop title="Are you sure?" onClick={() => {
            if (!deleteMutation.isLoading) {
                setDeleteWarning(false)
            }
        }}>
            <p>All changes will be PERMANENTLY deleted.</p>
            <div className="flex justify-end">
                <div className="flex flex-row gap-4">
                    <Button className="bg-red-400" onClick={() => {
                        if (!deleteMutation.isLoading) {
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
        return <ModalWithBackdrop title="Are you sure?" onClick={() => {
            if (!publishMutation.isLoading) {
                setPublishWarning(false)
            }
        }}>
            <p>All changes will be published.</p>
            <div className="flex justify-end">
                <div className="flex flex-row gap-4">
                    <Button className="bg-secondary" onClick={() => {
                        if (!publishMutation.isLoading) {
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
    return <main className="w-screen min-h-screen bg-primary text-white">
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
                <Button className="bg-secondary">Edit</Button>
                {deleteWarning && <DeleteWarning></DeleteWarning>}
                <Button className="bg-secondary" onClick={() => {
                    if (!deleteMutation.isLoading) {
                        setDeleteWarning(true)
                    }
                }}>Delete</Button>
            </div>
        </div>
    </main>


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


type CommentProp = {
    comment: ClientComment;
    blogId: string;
    userId?: string;
};

function Comment(props: CommentProp) {
    const { comment: c, userId, blogId } = props;
    const [isLiked, setIsLiked] = useState(
        (c.reactions.filter((r) => r.userId == userId)[0]?.type && true) || false
    );
    const [likes, setLikes] = useState(c.reactions.filter((r) => r.type).length);
    const commentReactionMutation = trpc.blog.comment.reaction.useMutation({
        onMutate: (variables) => {
            const { blogId, commentId, type } = variables;
            setIsLiked(type);
            if (type) {
                setLikes(likes + 1);
            } else {
                setLikes(likes - 1);
            }
        },
        onSuccess: (data) => {
            const { reaction, success } = data;
            //may need it
        },
        onError: (data, context) => {
            const { blogId, commentId, type } = context;
            setIsLiked(!type);
            if (type) {
                setLikes(likes - 1);
            } else {
                setLikes(likes + 1);
            }
        },
    });
    return (
        <div className=" flex flex-col gap-2">
            <div className="w-fit flex flex-row gap-2">
                <div className="h-full grid content-start">
                    <UserCircleIcon className="w-6 h-6"></UserCircleIcon>
                </div>
                <p className="text-2xl">{c.author} :</p>
            </div>
            <div>
                <p className=" p-2 text-4xl">{c.content}</p>
                <div className="p-2 flex w-fit flex-row gap-2 ">
                    <p>{likes}</p>
                    <button
                        onClick={() => {
                            if (userId) {
                                if (!commentReactionMutation.isLoading) {
                                    commentReactionMutation.mutate({
                                        blogId,
                                        commentId: c.id,
                                        type: !isLiked,
                                    });
                                }
                            } else {
                                alert("You need to log in to react");
                            }
                        }}
                        className={`${isLiked && "font-bold"
                            } `}
                    >
                        {isLiked ? <HandThumbUpIcon className="w-6 h-6"></HandThumbUpIcon> : <HandThumbUpIconOutline className="w-6 h-6"></HandThumbUpIconOutline>}
                    </button>
                </div>
            </div>
        </div>
    );
}

type AddCommentProp = {
    blog: Blog;
};

function AddComment(props: AddCommentProp) {
    const { blog } = props;
    const commentRef = useRef<HTMLInputElement>(null);
    const addCommentMutation = trpc.blog.comment.addComment.useMutation({
        onSuccess: () => {
            window.location.reload();
        },
    });
    return (
        <form
            className="flex flex-row w-fit gap-2"
            onSubmit={(e) => {
                e.preventDefault();
                if (commentRef) {
                    const content = commentRef.current?.value;
                    if (content) {
                        addCommentMutation.mutate({ content, blogId: blog.id });
                    }
                }
            }}
        >
            <label>
                <input
                    className="form-control block w-full px-4 py-2 mb-2 md:mb-0 md:mr-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-secondary focus:outline-[3px] focus:outline-none "
                    type="text"
                    ref={commentRef}
                ></input>
            </label>
            <Button
                type="submit"
                className="bg-secondary"
            >
                Submit
            </Button>
            {/* <button
        type="submit"
        className="w-fit  p-2"
      >
        Submit
      </button> */}
        </form>
    );
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
