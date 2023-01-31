import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import uuid from "react-uuid";
import { trpc } from "../../utils/trpc";
import { UserCircleIcon } from "@heroicons/react/24/solid";
export default function Main(props: PageProps) {
  //may need to create a global context for blogs
  const { username, blogs } = props;
  const [showBlogEdit, setShowBlogEdit] = useState(false);
  const [blogView, SetBlogView] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | undefined>();
  const [createMode, setCreateMode] = useState(false);
  return (
    <main className="w-screen bg-primary text-white">
      <TopBar></TopBar>
      <div className="grid-flow-cols grid h-full min-h-[90vh] w-full justify-items-center gap-4 bg-primary py-4 px-4 md:grid-cols-2 ">
        <div className="md:w-max-[30vw] w-max-[90vw] flex h-fit max-h-[80vh] w-fit flex-col gap-2 overflow-y-auto rounded-md bg-secondary py-4 px-8">
          <p className="text-center font-complementry text-4xl text-complementary">
            Your Blogs
          </p>
          <ul className="flex flex-col gap-2 px-8 text-2xl">
            {blogs.map((b) => {
              return (
                <li
                  className="list-disc decoration-complementary hover:cursor-pointer hover:underline"
                  key={uuid()}
                  onClick={() => {
                    setCurrentBlog(b);
                    SetBlogView(true);
                  }}
                >
                  {b.title}
                </li>
              );
            })}
          </ul>
          <div className="flex w-full items-center justify-center">
            <button
              onClick={() => {
                setCreateMode(true);
              }}
              className="w-fit rounded-md border-2 border-complementary bg-secondary px-2 py-2 font-complementry font-bold"
            >
              Create New Blog
            </button>
          </div>
        </div>
        {/* blog demo */}
        {blogView && currentBlog && (
          <BlogView {...{ blog: currentBlog }}></BlogView>
        )}
      </div>
    </main>
  );
}

function TopBar() {
  return (
    <div className="text-md grid h-[10vh] w-screen grid-cols-3 place-items-center gap-2 border-b-8 border-complementary md:grid-cols-[2fr_6fr_2fr] md:text-4xl">
      <div className="place-items-center text-center font-primary  font-bold">
        MIN
      </div>
      <div className="w-full place-items-center text-center font-complementry ">
        ADMIN PANEL
      </div>
      <div className="grid w-full  place-items-end justify-end gap-2">
        <UserCircleIcon className="mr-2 h-8 w-8"></UserCircleIcon>
      </div>
    </div>
  );
}

type BlogViewProps = {
  blog: Blog;
};

function BlogView(props: BlogViewProps) {
  const { blog } = props;
  return (
    <div className="flex h-[85vh] w-[90vw] flex-col gap-2 overflow-auto rounded-md bg-secondary md:w-[40vw]">
      <div className="h-[15vh] w-full rounded-t-md bg-yellow-200 text-black">
        IMAGE HERE
      </div>
      <p className="px-2 font-primary text-5xl font-bold">{blog.title}</p>
      <p className="px-2 font-secondary text-2xl">{blog.content}</p>
    </div>
  );
}

function CreateBlogView() {
  return (
    <form>
      <div className="flex h-[85vh] w-[90vw] flex-col gap-2 overflow-auto rounded-md bg-secondary md:w-[40vw]">
        <div className="h-[15vh] w-full rounded-t-md bg-yellow-200 text-black">
          IMAGE HERE
        </div>
        {/* <p className="px-2 font-primary text-5xl font-bold">{blog.title}</p>
        <p className="px-2 font-secondary text-2xl">{blog.content}</p> */}
      </div>
    </form>
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
        <label className="w-fit border border-solid border-black p-2">
          Select a cover photo
          <input type={"file"} accept="image/*" hidden></input>
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

function BlogDeme() {}
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
