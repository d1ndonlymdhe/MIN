import type { Blog } from "@prisma/client";
import dynamic from "next/dynamic";
import rehypeKatex from "rehype-katex";

import "@uiw/react-markdown-preview/markdown.css";
import { getBlogImage } from "../pages/blogs/[underscoreBlogName]";
// import getBlogImage from "../pages/api/getBlogContentImage";
const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false })
export default function BlogRenderer(props: { blog: Blog }) {
    const { blog } = props;
    console.log("content = ", blog.content)
    const content = blog.content;
    console.log(typeof content)
    return (
        <div className="grid grid-rows-[15vh_1fr_9fr] h-[85vh] w-[90vw] flex-col gap-2 overflow-auto rounded-md bg-secondary md:w-[40vw]">
            <div style={{
                backgroundImage: `url(${getBlogImage(blog.id)})`,
                // height: "50vh",
            }} className="h-[15vh] w-full rounded-t-md  text-black">

            </div>
            <p className="px-2 font-primary text-5xl font-bold">{blog.title}</p>
            <div className="text-left">
                <MDPreview style={{
                    background: "black",
                    color: "white",

                }} source={content} className="prose  rounded-md smallBlogContent md:blogContent" rehypePlugins={[rehypeKatex]}></MDPreview>
            </div>
        </div>
    );
}