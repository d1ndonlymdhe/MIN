import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import { trpc } from "../utils/trpc";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Button from "../globalComponents/Button";
import Spinner from "../globalComponents/Spinner";
import { remark } from "remark";
import html from "remark-html"
import remarkMath from "remark-math";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
// import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dist/shared/lib/dynamic";
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);
const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false })
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
      <div className="grid-flow-cols grid h-full min-h-[90vh] w-full justify-items-center gap-4 bg-primary py-4 px-4  ">
        <div className="flex flex-row gap-10">
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
              Pending Blogs
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

export function BlogView(props: BlogViewProps) {
  const { blog } = props;
  console.log("content = ", blog.content)
  const content = blog.content;
  console.log(typeof content)
  return (
    <div className="flex h-[85vh] w-[90vw] flex-col gap-2 overflow-auto rounded-md bg-secondary md:w-[40vw]">
      <div style={{
        backgroundImage: `url(/api/getBlogImage?blogId=${blog.id}&authorId=${blog.authorId})`
      }} className="h-[15vh] w-full rounded-t-md  text-black">

      </div>
      <p className="px-2 font-primary text-5xl font-bold">{blog.title}</p>
      <div className="text-left">
        <MDPreview style={{
          background: "black",
          color: "white",
          overflow: "scroll"
        }} source={content} className="prose rounded-md blogContent" remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}></MDPreview>
      </div>
    </div>
  );
}

type line = string;
type paragraph = line[];

function CreateBlogView() {
  const [title, setTitle] = useState("Title");
  const [newBlog, setNewBlog] = useState<Blog | undefined>()
  const [imgSet, setImageSet] = useState(false)
  const [imgSrc, setImgSrc] = useState("")
  const imgInputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState("");
  const createTempBlogMutation = trpc.blog.createTempBlog.useMutation({
    onSuccess: async (data) => {
      setNewBlog(data.newBlog)
      const form = new FormData()
      const blogImage = await (await fetch(imgSrc)).blob()
      form.append("blogId", data.newBlog.id);
      form.append("blogImage", blogImage)
      setImgUploadLoading(true)
      fetch("/api/handleBlogImage", {
        method: "POST",
        body: form
      }).then((res) => {
        setImgUploadLoading(false)
        return res.json()
      }).then((data) => {
        console.log(data)
      }
      )
    }
  })

  const addContentMutation = trpc.blog.addContent.useMutation()
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [imgUploadLoading, setImgUploadLoading] = useState(false)
  const [loading, setLoading] = useState(createTempBlogMutation.isLoading || imgUploadLoading)
  // text area ra title update garne seperate form huna parne refacor garna jhau lageko cha
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
      <div className="flex h-[85vh] w-[95vw] flex-col gap-2 overflow-auto rounded-md bg-secondary hover:cursor-pointer">
        <label
          className="hover:cursor-pointer"
          onChange={(e) => {
            if (imgInputRef && imgInputRef.current) {
              const files = imgInputRef.current.files
              if (files && files[0]) {
                console.log(URL.createObjectURL(files[0]))
                setImgSrc(URL.createObjectURL(files[0]))
                setImageSet(true)
                if (newBlog && !loading) {
                  const form = new FormData()
                  fetch(imgSrc).then(res => {
                    return res.blob()
                  }).then((blob) => {
                    const blogImage = blob
                    form.append("blogId", newBlog.id);
                    form.append("blogImage", blogImage)
                    setImgUploadLoading(true)
                    fetch("/api/handleBlogImage", {
                      method: "POST",
                      body: form
                    }).then((res) => {
                      setImgUploadLoading(false)
                      return res.json()
                    }).then((data) => {
                      console.log(data)
                    }
                    )
                  })
                }
              }
            }
          }}>
          <div style={
            {
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover"
            }
          } className="h-[25vh] w-full grid place-items-center rounded-t-md bg-yellow-200 text-black">
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
          <Button type="submit" className="bg-primary">
            {
              createTempBlogMutation.isLoading && <Spinner></Spinner> ||
              <div>Create Blog</div>
            }
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mx-2 my-4">
          <MDEditor preview='edit' value={content} onChange={(v) => { setContent(v || "") }} className="w-full mx-2 h-[50vh]"></MDEditor>
          <div className="text-left">
            <MDPreview style={{
              background: "black",
              color: "white",
              overflow: "scroll"
            }} source={content} className="prose rounded-md blogContent" remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}></MDPreview>
            {/* <ReactMarkdown className="prose rounded-md blogContent" remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} children={content}></ReactMarkdown> */}
          </div>
        </div>
        <Button onClick={() => {
          // if (!addContentMutation.isLoading) {
          // if (contentRef && contentRef.current && newBlog) {
          // const content = contentRef.current.value;
          if (newBlog) {

            if (content) {
              addContentMutation.mutate({ blogId: newBlog.id, content })
            }
          }
          // }
          // }
        }}
          className="bg-primary"
        >Submit</Button>
      </div>
    </form>
  );
}

type Set<T> = React.Dispatch<SetStateAction<T>>;

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
      // const parsedBlogs: Blog[] = []
      // for (let i = 0; i < user.blogs.length; i++) {
      //   const curBlog = user.blogs[i]
      //   if (curBlog) {
      //     const processedContent = await remark()
      //       .use(remarkMath)
      //       .use(html)
      //       .process(curBlog.content)
      //     const contentHtml = processedContent.toString();
      //     console.log(contentHtml)
      //     parsedBlogs.push({ ...curBlog, content: contentHtml })
      //   }
      // }
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
