import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
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
                SetBlogView(false);
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
  return (
    <form>
      <div className="flex h-[85vh] w-[90vw] flex-col gap-2 overflow-auto rounded-md bg-secondary md:w-[40vw]">
        <div className="h-[15vh] w-full rounded-t-md bg-yellow-200 text-black">
          IMAGE HERE
        </div>
        <input
          value={title}
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              //will auto submit
              e.preventDefault();
            }
          }}
          className="mx-2 rounded-xl bg-secondary px-2 font-primary text-5xl font-bold focus:border-4 focus:border-complementary focus:outline-none active:outline-none"
        ></input>
        {/* <div className="flex flex-row justify-between gap-2 px-10">
          <button
            onClick={(e) => {
              setParagraphs([...paragraphs, ["Add Your content"]])
              // setParagraphs([...paragraphs, "Add Your content"]);
            }}
            type="button"
            className="w-fit rounded-md border-2 border-complementary bg-secondary px-2 py-2 font-complementry font-bold focus:border-4 focus:outline-none"
          >
            Add Paragraph
          </button>
          <button
            type="button"
            onClick={() => {
              // setCreateMode(true);
            }}
            className="w-fit rounded-md border-2 border-complementary bg-secondary px-2 py-2 font-complementry font-bold focus:border-4 focus:outline-none"
          >
            Add Image
          </button>
          <button
            type="button"
            onClick={() => {
              // setCreateMode(true);
            }}
            className="w-fit rounded-md border-2 border-complementary bg-secondary px-2 py-2 font-complementry font-bold focus:border-4 focus:outline-none"
          >
            Add Math
          </button>
        </div> */}
        <div className="text-2xl  font-bold font-primary px-2">
          <p>Content Input Under Construction 🛠️🛠️</p>
          <p>Make yourself familiar with markdown <a className="hover:underline text-blue-400">Cheatsheet</a></p>
          <p>Use a markdown editor like <a href="https://stackedit.io/" className="hover:underline text-blue-400">StackEdit</a></p>
          <p>Paste Markdown code below</p>
        </div>
        <div>

        </div>
      </div>
    </form>
  );
}

function ParagraphEdit(props: { paragraph: paragraph }) {
  const { paragraph } = props;
  // const paragraphRef = useRef<HTMLTextAreaElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [lines, setLines] = useState<line[]>(paragraph || []);
  // const [currentLineContent, setCurrentLineContent] = useState(0);
  // useEffect(() => {}, [lines]);
  return (
    <div className="border-complementary px-2 group-focus:border-2">
      {lines.map((l, i) => {
        return (
          <Line
            {...{
              line: lines[i] || "",
              lines,
              setLines,
              setCurrentLineIndex,
              currentLineIndex,
            }}
            key={uuid()}
            focus={currentLineIndex == i}
          ></Line>
        );
      })}
    </div>
  );
}

type LineProps = {
  line: string;
  lines: string[];
  setLines: Set<string[]>;
  focus: boolean;
  currentLineIndex: number;
  setCurrentLineIndex: Set<number>;
};

type Set<T> = React.Dispatch<SetStateAction<T>>;

function Line(props: LineProps) {
  const {
    line,
    lines,
    setLines,
    focus,
    currentLineIndex,
    setCurrentLineIndex,
  } = props;
  const [l, setL] = useState(line);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) {
      console.log(ref.current);
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, []);
  return (
    <input
      ref={ref}
      className="w-full bg-secondary focus:outline-none active:outline-none"
      value={l}
      onChange={(e) => {
        setL(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          const copyLines = [...lines];
          copyLines[currentLineIndex] = l;
          copyLines.push("");
          setLines(copyLines);
          setCurrentLineIndex(currentLineIndex + 1);
        } else if (e.key == "Backspace") {
          if (l == "") {
          }
        }
        // if(l.length)
      }}
    ></input>
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
