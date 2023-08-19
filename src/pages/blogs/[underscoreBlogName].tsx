import { GetServerSideProps } from "next";
import { BlogReaction, CommentReaction, PrismaClient } from "@prisma/client"


import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from "remark-gfm";
import { PaperAirplaneIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Navbar from "../../globalComponents/Navbar";
import { useRef, useState } from "react";
import Input from "../../globalComponents/Input";
import { trpc } from "../../utils/trpc";
import Spinner from "../../globalComponents/Spinner";
import Button from "../../globalComponents/Button";
import ModalWithBackdrop from "../../globalComponents/ModalWithBackdrop";

export default function Post(props: PageProps) {
    const blog = props.content as string;
    const userId = props.userId;
    const name = props.username;
    const author = props.author;
    const publishedOn = props.blog.publishedOn;
    const [comments, setComments] = useState(props.comments);
    const title = props.blog.title as string;
    const blogId = props.blog.id;
    const authorId = props.blog.authorId;
    const [modalShown, setModalShown] = useState(false);
    return <>
        <Navbar setModalShown={setModalShown} activeTab="Blogs"></Navbar>
        <div className="w-full h-fit flex flex-col items-center my-10 text-white gap-5">
            <div className="flex flex-row items-center justify-center text-white text-[6rem] font-primary font-[700] w-[60vw] h-[50vh] rounded-md" style={{
                backgroundImage: `url(${getBlogImage(blogId)})`,
                backgroundSize: "cover"
            }}>
                <p>
                    {title}
                </p>
            </div>
            <div className="w-[60vw] flex gap-2 items-center font-inter text-xl">
                {/* TODO add user image */}
                <div>
                    <UserCircleIcon className="h-10 w-10"></UserCircleIcon>
                </div>
                <p className="text-[#FFB700]">
                    {author}
                </p>
                <p>
                    {/* {ps} */}
                    {(new Date(Number(publishedOn)).toDateString())}
                    {/* {new Date(publishedOn).toDateString()} */}
                </p>
            </div>
            <div className="w-[60vw]">
                <Blog content={blog}></Blog>

            </div>
            <Comment comments={comments} blogId={blogId} setComments={setComments} userId={userId} username={name} authorId={authorId}></Comment>
        </div>
    </>
}


type CommentProps = {
    comments: ClientComment[],
    setComments: setState<ClientComment[]>
    blogId: string,
    userId: string;
    username: string;
    authorId: string;
}

type setState<T> = React.Dispatch<React.SetStateAction<T>>

function Comment(props: CommentProps) {
    const { blogId, comments, setComments, userId, username, authorId } = props
    const commentMutatation = trpc.blog.comment.addComment.useMutation({
        onSuccess: (data) => {
            setComments([...comments, {
                author: username,
                authorId: userId,
                blogId: blogId,
                content: data.content,
                id: data.commentId,
                // reaction: [],
            }])
        }
    });
    const inputRef = useRef<HTMLInputElement>(null);
    return <div className="flex flex-col gap-4 rounded-md bg-secondary max-h-[50vh] w-[60vw] py-4 px-20">
        <div className="flex flex-row gap-4 justify-center">
            <UserCircleIcon className="h-10 w-10"></UserCircleIcon>
            <form className="h-fit w-full flex flex-row gap-4" onSubmit={(e) => {
                e.preventDefault()
                if (inputRef.current && !commentMutatation.isLoading) {
                    const content = inputRef.current.value;
                    if (content) {
                        commentMutatation.mutate({
                            blogId: blogId,
                            content: content
                        })
                    }
                }
            }}>
                <Input ref={inputRef} className="w-full bg-transparent border-transparent border-b-2 active:outline-none  focus:outline-none focus:border-b-4 rounded-sm ease-in-out duration-100 border-b-complementary text-white"></Input>
                <button type="submit">
                    {
                        commentMutatation.isLoading && <Spinner></Spinner> || <PaperAirplaneIcon className="h-10 w-10"></PaperAirplaneIcon>
                    }
                </button>
            </form>
        </div>
        <div className="flex flex-col gap-4">
            {
                comments.map(c => {
                    return <div key={c.id} className="flex flex-row gap-4 items-center">
                        <UserCircleIcon className="h-10 w-10"></UserCircleIcon>
                        <div className="font-complementry text-xl">
                            {c.content}
                        </div>
                        {userId == authorId && <CommentDeleteButton {...{ blogId, commentId: c.id, comments, setComments }}></CommentDeleteButton>}
                    </div>
                })
            }
        </div>
    </div>
}


type deleteButtonProps = {
    commentId: string;
    blogId: string;
    comments: ClientComment[],
    setComments: setState<ClientComment[]>

}

function CommentDeleteButton(props: deleteButtonProps) {
    const { commentId, blogId, comments, setComments } = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const deleteMutation = trpc.blog.comment.deleteComment.useMutation({
        onSuccess: (data) => {
            let temp = comments.filter(c => {
                c.id != data.commentId;
            })
            setComments(temp);
            setShowDeleteModal(false);
        }
    });
    const deleteHandler = () => {
        if (!deleteMutation.isLoading) {
            setShowDeleteModal(true);
        }
    }
    return <div>
        <ModalWithBackdrop title="Delete Comment?" isShown={showDeleteModal} onClick={() => {
            if (!deleteMutation.isLoading) {
                setShowDeleteModal(false);
            }
        }}>
            <p>
                Are you sure you want to delete the comment?
            </p>
            <div className="flex justify-end gap-4">
                <Button className="bg-blue-400" onClick={() => {
                    if (!deleteMutation.isLoading) {
                        setShowDeleteModal(false);
                    }
                }}>NO</Button>
                <Button className="bg-red-400" onClick={() => {
                    if (!deleteMutation.isLoading) {
                        deleteMutation.mutate({ blogId, commentId })

                    }
                }}>Yes</Button>
            </div>
        </ModalWithBackdrop>
        <Button className="bg-red-500" onClick={deleteHandler}>
            <TrashIcon className="h-8 w-8" ></TrashIcon>
        </Button>
    </div>
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
            (username = dbToken.user.name), (userId = dbToken.userId);
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
                            // reactions: commentReactions.filter((r) => r.commentId == c.id),
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


type ClientComment = {

    author: string;
    authorId: string;
    blogId: string;
    content: string;
    id: string;
    // reaction: CommentReaction[]
}


type PageProps = {
    author: string;
    content: string;
    blog: {
        authorId: string;
        content: string;
        id: string;
        title: string;
        publishedOn: string;
    };
    reactions: BlogReaction[];
    comments: ClientComment[]
    loggedIn: boolean;
    userId: string;
    username: string;
    isLiked: boolean;
}



export function getBlogImage(blogId: string) {

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME

    return `https://res.cloudinary.com/${cloudName}/image/upload/blogs/${blogId}/blogImage.jpg`

}

export function getBlogContentImage(blogId: string, imageId: string) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
    return `https://res.cloudinary.com/${cloudName}/image/upload/blogs/${blogId}/images/${imageId}.jpg`
}