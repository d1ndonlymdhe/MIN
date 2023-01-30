import {
  Blog,
  BlogReaction,
  Comment,
  CommentReaction,
  PrismaClient,
  User,
} from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import uuid from "react-uuid";
import { trpc } from "../../../utils/trpc";

export default function Main(props: PageProps) {
  const {
    blog,
    loggedIn,
    author,
    comments,
    reactions,
    userId,
    username,
    isLiked: liked,
  } = props;
  const [isLiked, setIsLiked] = useState(liked);
  //select all true
  const [likeCount, setLikeCount] = useState(
    reactions.filter((r) => r.type).length
  );
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
  return (
    <main className="grid grid-rows-[2fr_8fr]">
      <div>
        MIN blog {blog.title} by {author}{" "}
      </div>
      <div className="flex flex-col gap-2">
        <div className="border border-solid border-black p-2">
          {blog.content}
        </div>
        <div className="flex w-fit flex-row gap-2">
          {/* like and dislike */}
          <button
            className={`${
              isLiked && "font-bold"
            } border border-solid border-black px-2`}
            onClick={() => {
              if (loggedIn) {
                likeMutation.mutate({
                  blogId: blog.id,
                  type: !isLiked,
                });
              } else {
                alert("You need to log in");
              }
            }}
          >
            {(isLiked && "Liked") || "Like"}
          </button>
          <p>{likeCount} likes</p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Comments</p>
          {(loggedIn && <AddComment {...{ blog }}></AddComment>) || (
            <div> You need to log in to add comments </div>
          )}
          {comments.map((c) => {
            return (
              <Comment
                key={uuid()}
                {...{ comment: c, userId, blogId: blog.id }}
              ></Comment>
            );
          })}
        </div>
      </div>
    </main>
  );
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
    <div className=" flex flex-col gap-2 border border-solid border-black">
      <p>{c.author} :</p>
      <p className=" p-2">{c.content}</p>
      <div className="flex w-fit flex-row gap-2 ">
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
          className={`${
            isLiked && "font-bold"
          } border border-solid border-black px-2`}
        >
          {isLiked ? "Liked" : "Like"}
        </button>
        <p>{likes} likes</p>
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
      className="flex flex-col gap-2 border border-solid border-black"
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
        Add your comment
        <input
          className="border border-solid border-black"
          type="text"
          ref={commentRef}
        ></input>
      </label>
      <button
        type="submit"
        className="w-fit border border-solid border-black p-2"
      >
        Submit
      </button>
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
  PageProps,
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
    const blogName = underScoreBlogName.split("_").join(" ");
    const blog = await prisma.blog.findFirst({
      where: { title: blogName },
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
            // console.log(commentReactions.filter((r)=> r. == c.id))
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
