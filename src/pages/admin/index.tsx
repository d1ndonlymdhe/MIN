import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import uuid from "react-uuid";
import { trpc } from "../../utils/trpc";
export default function Main(props: PageProps) {
  const { username, blogs } = props;
  const [showBlogEdit, setShowBlogEdit] = useState(false);
  return (
    <main className="grid grid-rows-[2fr_8fr]">
      <div> {username} ADMIN DASHBOARD</div>
      <div className="flex flex-col gap-2">
        <div>Your Blogs</div>
        {/* show users published blogs here */}
        {blogs.map((b) => {
          return (
            <div key={uuid()} className="flex flex-col">
              <div className="font-bold">{b.title}</div>
              <div>{b.content}</div>
              {/* blog options (delete,edit...) */}
            </div>
          );
        })}
        <button
          className="w-fit border border-solid border-black px-2 py-1"
          onClick={() => {
            setShowBlogEdit(true);
          }}
        >
          Create new blog
        </button>
        {showBlogEdit && <CreateBlog></CreateBlog>}
      </div>
    </main>
  );
}
function CreateBlog() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const blogCreateMutation = trpc.blog.createBlog.useMutation({
    onSuccess: (data) => {
      // update the blogs state no need to reload 
      window.location.reload();
    },
  });
  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (titleRef && contentRef) {
            const title = titleRef.current?.value;
            const content = contentRef.current?.value;
            if (title && content) {
              blogCreateMutation.mutate({ title, content });
            }
          }
        }}
      >
        <label>
          Title:
          <input
            type={"text"}
            className=" border border-solid border-black"
            ref={titleRef}
          ></input>
        </label>
        <label>
          Content:
          <textarea
            className="h-40 border border-solid border-black"
            ref={contentRef}
          ></textarea>
        </label>
        <button
          type="submit"
          className="w-fit border border-solid border-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

type PageProps = {
  username: string;
  blogs: Blog[];
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const token = context.req.cookies.token;
  const prisma = new PrismaClient();
  if (token) {
    const dbToken = await prisma.token.findFirst({
      where: { value: token },
      include: {
        user: {
          include: {
            blogs: true,
          },
        },
      },
    });
    if (dbToken) {
      const user = dbToken.user;

      if (user) {
        return {
          props: {
            username: user.username,
            blogs: user.blogs,
          },
        };
      }
    }
  }
  return {
    redirect: {
      destination: "/adminLogin",
      permanent: false,
    },
  };
};
