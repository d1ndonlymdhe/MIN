import { Blog } from "@prisma/client";
import dynamic from "next/dynamic";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import "@uiw/react-markdown-preview/markdown.css";
const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false })
export default function BlogRenderer(props: { blog: Blog }) {
    const { blog } = props;
    console.log("content = ", blog.content)
    const content = blog.content;
    console.log(typeof content)
    return (
        <div className="grid grid-rows-[15vh_1fr_9fr] h-[85vh] w-[90vw] flex-col gap-2 overflow-auto rounded-md bg-secondary md:w-[40vw]">
            <div style={{
                backgroundImage: `url(/api/getBlogImage?blogId=${blog.id}&authorId=${blog.authorId})`,
                // height: "50vh",
            }} className="h-[15vh] w-full rounded-t-md  text-black">

            </div>
            <p className="px-2 font-primary text-5xl font-bold">{blog.title}</p>
            <div className="text-left">
                <MDPreview style={{
                    background: "black",
                    color: "white",

                }} source={content} className="prose  rounded-md smallBlogContent md:blogContent" remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}></MDPreview>
            </div>
        </div>
    );
}