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
import "@uiw/react-md-editor/markdown-editor.css";

import dynamic from "next/dist/shared/lib/dynamic";
import BlogRenderer from "../globalComponents/BlogRenderer";
import ModalWithBackdrop from "../globalComponents/ModalWithBackdrop";
import Input from "../globalComponents/Input";
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
              {/* when button is clicked create a new temp blog and pass it as the blog */}
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
          <BlogRenderer {...{ blog: currentBlog }}></BlogRenderer>
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


type line = string;
type paragraph = line[];

type Image = {
  name: string,
  src: string
}

function CreateBlogView() {
  const [title, setTitle] = useState("Title");
  const [newBlog, setNewBlog] = useState<Blog | undefined>()
  const [imgSet, setImageSet] = useState(false)
  const [imgSrc, setImgSrc] = useState("")
  const imgInputRef = useRef<HTMLInputElement>(null)
  const [content, setContent] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
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
  const [images, setImages] = useState<Image[]>([])
  const addContentMutation = trpc.blog.addContent.useMutation()
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [imgUploadLoading, setImgUploadLoading] = useState(false)
  const [loading, setLoading] = useState(createTempBlogMutation.isLoading || imgUploadLoading)
  const AddImages = () => {

    const [upModal, SetUpModal] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);

    const ModalChild = () => {
      // const textRef = useRef<HTMLInputElement>(null)
      const nameRef = useRef<HTMLInputElement>(null)
      const srcRef = useRef<HTMLInputElement>(null)
      const fileRef = useRef<HTMLInputElement>(null)
      return <>
        <p>Add image from internet</p>
        <Input ref={nameRef} name="imageMame" placeholder="Enter image name"></Input>
        <Input ref={srcRef} name="imageSrc" placeholder="Paste link here"></Input>
        <hr></hr>
        <p>or</p>
        <p>Add local image</p>
        <Input ref={fileRef} type="file" accept="image/*"></Input>
        <Button className="bg-secondary border-complementary" onClick={(e) => {
          if (!uploadLoading) {
            if (fileRef && fileRef.current) {
              const files = fileRef.current.files
              if (files && files[0] && newBlog) {
                const formData = new FormData();
                formData.append("blogId", newBlog.id);
                formData.append("blogImage", files[0]);
                setUploadLoading(true)
                if (nameRef && nameRef.current && srcRef && srcRef.current) {
                  nameRef.current.readOnly = true
                  srcRef.current.readOnly = true
                }
                fetch(`/api/handleBlogContentImage`, {
                  method: "POST",
                  body: formData,
                  credentials: "include"
                }).then(res => res.json()).then((data: { success: boolean, newImgId: string, blogId: string, imgName: string }) => {
                  console.log(data)
                  const { blogId, newImgId, success, imgName } = data;
                  if (success) {
                    console.log("here")
                    console.log(nameRef, srcRef)
                    setContent(`${content} \n ![${imgName}](${`/api/getBlogContentImage?blogId=${blogId}&imageId=${newImgId}&authorId=${newBlog.authorId}`})`);
                    setUploadLoading(false)
                    SetUpModal(false)
                  }
                })
              }
              else {
                if (nameRef && nameRef.current && srcRef && srcRef.current) {
                  const imgName = nameRef.current.value;
                  const imgSrc = srcRef.current.value;
                  setContent(`${content} \n ![${imgName}](${imgSrc})`);
                  SetUpModal(false)
                }
              }
            }
          }

        }}>{uploadLoading && "Loading" || "Add This"}</Button>
      </>
    }
    return <div>
      {
        images.filter((img, i) => {
          if (i < 5) {
            return img
          }
        }).map(img => {
          return <p onClick={() => {
            navigator.clipboard.writeText(img.src).then(() => { console.log("written ", img.src) })
          }}>{img.name}</p>
        })
      }

      {upModal && <ModalWithBackdrop title="Add image" onClick={() => { SetUpModal(false) }}>
        <ModalChild></ModalChild>
      </ModalWithBackdrop>}

      <Button className="bg-emerald-500 mx-4" onClick={() => {
        SetUpModal(true);
      }}>Add image</Button>
    </div>
  }
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
          <div className="grid grid-cols-[8fr_2fr]">
            <MDEditor preview='edit' value={content} onChange={(v) => { setContent(v || "") }} className="w-full mx-2 h-[50vh]"></MDEditor>
            <AddImages></AddImages>
          </div>
          <div className="text-left">
            <MDPreview style={{
              background: "black",
              color: "white",
              overflow: "scroll"
            }} source={content} className="prose rounded-md blogContent" remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}></MDPreview>
          </div>
        </div>
        {showConfirmDialog &&
          <ModalWithBackdrop title="Are You sure" onClick={() => {
            if (!addContentMutation.isLoading) {
              setShowConfirmDialog(false);
            }
          }}>
            <p>
              Your blog will be added to the pending queue where you can inspect it.
            </p>
            <Button onClick={() => {
              if (newBlog && !addContentMutation.isLoading) {
                if (content) {
                  setShowConfirmDialog(true)
                  addContentMutation.mutate({ blogId: newBlog.id, content })
                }
              }
            }}
              className="bg-primary w-fit mx-4"
            > {
                addContentMutation.isLoading && "Loading" || "Ok"
              }
            </Button>
            <Button onClick={() => { setShowConfirmDialog(false) }}>
              Cancel
            </Button>
          </ModalWithBackdrop>}
        <Button onClick={() => {
          if (newBlog && !addContentMutation.isLoading) {
            if (content) {
              setShowConfirmDialog(true)
              // addContentMutation.mutate({ blogId: newBlog.id, content })
            }
          }
        }}
          className="bg-primary w-fit mx-4"
        >
          Continue
        </Button>
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
