import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Navbar from "../../globalComponents/Navbar";
import { useState } from "react";
import { Intro } from "..";
import homeImage from "../../../public/images/homeImage.jpg";
import homeImageL from "../../../public/images/homeImageL.jpg";
import Head from "next/head";
import { getBlogImage } from "./[underscoreBlogName]";
import { trpc } from "../../utils/trpc";
import Button from "../../globalComponents/Button";
import Spinner from "../../globalComponents/Spinner";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import Footer from "../../globalComponents/Footer";
type ClientBlog = Blog & {
    author: {
        name: string;
    }
}
type PageProps = {
    blogs: ClientBlog[]
}
export default function NewIndex(props: PageProps) {
    // const blogs = props.blogs;
    //for build
    const [blogs, setBlogs] = useState(props.blogs);
    const [isNavShown, setIsNavShown] = useState(false);
    const loadMoreMutation = trpc.blog.getBlogs.useMutation({
        onSuccess: (data) => {
            setBlogs([...blogs, ...data.blogs])
        }
    })
    const LDButton = <LoadButton onClick={() => {
        loadMoreMutation.mutate({
            from: blogs.length, to: blogs.length + 5, sortBy: {
                property: "time"
            }
        })
    }} isLoading={loadMoreMutation.isLoading}></LoadButton>
    return <div className={`flex gap-10 flex-col ${isNavShown ? "overflow-y-hidden" : "overflow-y-auto"} overflow-x-hidden`}>
        <Head>
            <style>
                {
                    `
                .bg1{
                    background-image:url(${homeImage.src});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    width: 100vw;
                    height: 80vh;

                }
                @media only screen and (min-width:768px){
                    .bg1{
                        background-image:url(${homeImageL.src});
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                        width: 100vw;
                        height: 100vh;

                    }
                }`
                }
            </style>
        </Head>
        <Intro activeTab="Blogs" setModalShown={setIsNavShown}></Intro>
        {/* for desktop */}
        <div style={{
            gridTemplateAreas: `'first first'`
        }} className="hidden md:grid gap-4 px-10 w-full md:grid-cols-2">
            {
                blogs.map((b, i) => {
                    if (i == 0) {
                        return <div key={i} style={{ gridArea: "first" }}> <BlogThumbnail blog={b}></BlogThumbnail> </div>
                    } else {
                        return <BlogThumbnail key={i} blog={b}></BlogThumbnail>
                    }
                })

            }
            {LDButton}
        </div>
        {/* for mobile */}
        <div className="grid md:hidden gap-6 px-4 w-full grid-cols-1">
            {
                blogs.map((b, i) => {
                    return <BlogThumbnail key={i} blog={b}></BlogThumbnail>
                })

            }
            {LDButton}
        </div>
        <Footer></Footer>
    </div>
}

type ThumbnailProps = {
    blog: ClientBlog
}

type LoadButtonProps = {
    isLoading: boolean,
    onClick: () => void
}

function LoadButton(props: LoadButtonProps) {
    const { isLoading, onClick } = props;
    return <Button className="bg-secondary mx-2 w-full py-4 md:py-2" onClick={() => {
        if (!isLoading) {
            onClick();
        }
    }}
    >
        <div className="grid place-content-center">
            {
                !isLoading && <div className="flex flex-col justify-center items-center md:text-xl">
                    <PlusIcon className="w-16 md:w-24 h-16 md:h-24"></PlusIcon>
                    Load More
                </div> || <Spinner></Spinner>
            }
        </div>
    </Button>
}


function BlogThumbnail(props: ThumbnailProps) {
    const { blog } = props;
    return <a href={`/blogs/${blog.titleLowered.replaceAll(" ", "_")}`}>
        <div className="w-full rounded-md flex gap-4 flex-col justify-end h-[30rem]" style={{
            backgroundImage: `url(${getBlogImage(blog.id)})`,
            backgroundSize: "cover"
        }}>
            <div className="flex flex-row justify-between py-4 px-4 bg-black bg-opacity-30 text-white font-bold text-lg md:text-2xl">
                <span>
                    {
                        blog.title
                    }
                </span>
                <span>
                    {
                        blog.author.name
                    }
                    {
                        `  (${(new Date(Number(blog.publishedOn))).toLocaleDateString()})`
                    }
                </span>
            </div>
        </div>
    </a>
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    // const token = context.req.cookies?.token;
    const prisma = new PrismaClient()
    const blogCount = 3;
    const latestBlogs = await prisma.blog.findMany({ where: { isTemp: false }, orderBy: { publishedOn: "desc" }, include: { author: { select: { name: true } } } })

    return {
        props: {
            blogs: latestBlogs.reverse().slice(0 - blogCount).reverse()
        }
    }
}

