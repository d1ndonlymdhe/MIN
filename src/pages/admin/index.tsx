import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import { trpc } from "../../utils/trpc";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Button from "../../globalComponents/Button";
import Spinner from "../../globalComponents/Spinner";
export default function Main(props: PageProps) {
  //may need to create a global context for blogs
  const { username, blogs } = props;
  const [showBlogEdit, setShowBlogEdit] = useState(false);
  const [publishedBlogs, setPublishedBlogs] = useState(blogs.filter(b => !b.isTemp))
  const [unPublishedBlogs, setUnPublishedBlogs] = useState(blogs.filter(b => b.isTemp))
  const [blogView, SetBlogView] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | undefined>();
  const [createMode, setCreateMode] = useState(false);
  return (
    <main className="w-screen bg-primary text-white">
      <TopBar></TopBar>
      <div className="grid-flow-cols grid h-full min-h-[90vh] w-full justify-items-center gap-4 bg-primary py-4 px-4 md:grid-cols-2 ">
        <div className="md:w-max-[30vw] w-max-[90vw] flex h-fit max-h-[80vh] w-fit flex-col gap-2 overflow-y-auto rounded-md bg-secondary py-4 px-8">
          <p className="text-center font-complementry text-4xl text-complementary">
            Published Blogs
          </p>
          <ul className="flex flex-col gap-2 px-8 text-2xl">
            {publishedBlogs.map((b) => {
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
                SetBlogView(false);
              }}
              className="w-fit rounded-md border-2 border-complementary bg-secondary px-2 py-2 font-complementry font-bold"
            >
              Create New Blog
            </button>
          </div>
        </div>
        <div className="md:w-max-[30vw] w-max-[90vw] flex h-fit max-h-[80vh] w-fit flex-col gap-2 overflow-y-auto rounded-md bg-secondary py-4 px-8">
          <p className="text-center font-complementry text-4xl text-complementary">
            Your Blogs
          </p>
          <ul className="flex flex-col gap-2 px-8 text-2xl">
            {unPublishedBlogs.map((b) => {
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
                //add blog controls delete, publish , show
              );
            })}
          </ul>

        </div>
        {/* blog demo */}
        {blogView && currentBlog && (
          <BlogView {...{ blog: currentBlog }}></BlogView>
        )}
        {createMode && <CreateBlogView></CreateBlogView>}
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

type line = string;
type paragraph = line[];

function CreateBlogView() {
  const [title, setTitle] = useState("Title");
  const [paragraphs, setParagraphs] = useState<paragraph[]>([]);
  // const [currentParagraphIndex,setpa]
  const [imgSet, setImageSet] = useState(false)
  const [imgSrc, setImgSrc] = useState("")
  const imgInputRef = useRef<HTMLInputElement>(null)
  const createTempBlogMutation = trpc.blog.createTempBlog.useMutation({

  })
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      if (imgSet && title) {
        createTempBlogMutation.mutate({
          title: title,
          hasImage: true
        })
      }
    }}>
      <div className="flex h-[85vh] w-[90vw] flex-col gap-2 overflow-auto rounded-md bg-secondary md:w-[40vw] hover:cursor-pointer">
        <label onChange={(e) => {
          if (imgInputRef && imgInputRef.current) {
            const files = imgInputRef.current.files
            if (files && files[0]) {
              console.log(URL.createObjectURL(files[0]))
              setImgSrc(URL.createObjectURL(files[0]))
              setImageSet(true)
            }
          }
        }}>
          <div style={
            {
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover"
            }
          } className="h-[15vh] w-full grid place-items-center rounded-t-md bg-yellow-200 text-black">
            {!imgSet && <p>IMAGE HERE</p>}
          </div>
          <input hidden type={"file"} accept="image/*" ref={imgInputRef}></input>
        </label>
        <div className="grid grid-cols-[8fr_2fr] gap-2 mx-2">
          <div className="h-full w-full">
            <input
              value={title}
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="rounded-xl w-full pl-2 bg-secondary font-primary text-5xl font-bold focus:outline-4 focus:outline-complementary"
            ></input>
          </div>
          <Button type="submit">
            {
              createTempBlogMutation.isLoading && <Spinner></Spinner> ||
              <div>Create Blog</div>
            }
          </Button>
        </div>
        <div className="text-2xl  font-bold font-primary mx-2">
          <p>Content Input Under Construction 🛠️🛠️</p>
          <p>Make yourself familiar with markdown <a className="hover:underline text-blue-400" href="https://www.markdownguide.org/cheat-sheet/">Cheatsheet</a></p>
          <p>Use a markdown editor like <a href="https://stackedit.io/" className="hover:underline text-blue-400">StackEdit</a></p>
        </div>
        <label>
          <p className="text-2xl  font-bold font-primary mx-2">Paste Markdown code below:</p>
          <div className="grid place-items-center mt-2">
            <textarea className="w-[90%] h-full mb-2 px-2 text-black">
            </textarea>
          </div>
          <Button>Submit</Button>
        </label>
      </div>
    </form>
  );
}

type Set<T> = React.Dispatch<SetStateAction<T>>;

function BlogDeme() { }
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
