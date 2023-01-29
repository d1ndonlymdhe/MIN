import { Blog, Comment, PrismaClient, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRef } from "react";
import uuid from "react-uuid";
import { trpc } from "../../../utils/trpc";

export default function Main(props: PageProps) {
  const { blog, loggedIn, author, comments } = props;
  const commentRef = useRef<HTMLInputElement>(null);
  const addCommentMutation = trpc.blog.comment.addComment.useMutation({
    onSuccess: () => {
      window.location.reload();
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
        <div className="flex flex-col gap-2">
          <p>Comments</p>
          {(loggedIn && (
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
          )) || <div> You need to log in to add comments </div>}
          {comments.map((c) => {
            return (
              <div className=" flex flex-col gap-2 border border-solid border-black" key={uuid()}>
                <p>{c.author} :</p>
                <p className=" p-2">{c.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

type PageProps = {
  loggedIn: boolean;
  blog: Blog;
  author: string;
  comments: (Comment & {
    author: string;
  })[];
};

export const getServerSideProps: GetServerSideProps<
  PageProps,
  { underscoreBlogName: string }
> = async (context) => {
  const underScoreBlogName = context.params?.underscoreBlogName;
  console.log(context.req.cookies);
  const token = context.req.cookies.token;
  const prisma = new PrismaClient();
  let loggedIn = false;
  console.log(token);
  if (token) {
    const dbToken = await prisma.token.findFirst({ where: { value: token } });
    if (dbToken) {
      loggedIn = true;
    }
  }
  console.log(underScoreBlogName);
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
      return {
        props: {
          author: blog.author.name,
          blog: {
            authorId: blog.authorId,
            content: blog.content,
            id: blog.id,
            title: blog.title,
          },
          comments: comments.map((c) => {
            return {
              author: c.author.name,
              authorId: c.authorId,
              blogId: c.blogId,
              content: c.content,
              id: c.id,
            };
          }),
          loggedIn,
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
