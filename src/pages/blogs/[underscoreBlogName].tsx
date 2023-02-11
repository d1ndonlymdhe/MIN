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
import Button from "../../globalComponents/Button";
import { trpc } from "../../utils/trpc";
import { BlogView } from "../admin"
export default function Main2(props: PageProps) {
  const { blog, loggedIn, author, comments, reactions, isLiked: liked, userId, username } = props
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(
    reactions.filter(r => r.type).length
  )
  const likeMutation = trpc.blog.reaction.useMutation({
    // read this https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
    onMutate: (variables) => {
      setIsLiked(variables.type);
      setLikeCount(variables.type ? likeCount + 1 : likeCount - 1);
    },
    onSuccess: (data) => {
      setIsLiked(data.reaction.type);
    },
    onError: (data, context) => {
      setIsLiked(!context.type);
      setLikeCount(context.type ? likeCount - 1 : likeCount + 1);
    },
  });
  return <main className="w-screen min-h-screen bg-primary text-white">
    <TopBar></TopBar>
    <div className="h-full w-full py-2 px-2 grid grid-cols-[6fr_4fr] gap-4">
      <div className="w-full min-h-[85vh]  grid place-items-center">
        <div className="h-fit w-fit">
          <BlogView blog={blog}></BlogView>
        </div>
      </div>
      <div className="w-full min-h-[85vh] flex flex-col px-8 gap-8">
        {/* userinfo */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl">Posted by :</h3>
          <div className="flex flex-row gap-4">
            <UserCircleIcon className="h-10 w-10"></UserCircleIcon>
            <p className="text-4xl font-bold">{
              author
            }</p>
          </div>
        </div>
        {/* comments */}
        <div className="flex flex-col gap-4">
          <div>Like this blog <div className="p-2 flex w-fit flex-row gap-2 ">
            <p>{likeCount}</p>
            <button
              onClick={() => {
                if (userId) {
                  if (!likeMutation.isLoading) {
                    likeMutation.mutate({
                      blogId: blog.id,
                      type: !isLiked
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
          </div></div>
          <p className="text-2xl">Comments :</p>
          {
            loggedIn &&
            <AddComment blog={blog}></AddComment>
          }
          {
            comments.map(c => {
              return <Comment comment={c} blogId={blog.id} userId={userId}></Comment>
            })
          }
        </div>
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
      where: { titleLowered: blogName },
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
  return {
    redirect: {
      destination: "/blogs/error",
      permanent: false,
    },
  };
};
