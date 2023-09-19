import { Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next"
import { useState } from "react";
import uuid from "react-uuid";
import Button from "../../globalComponents/Button";
// import { ModalContextProvider, useModalContext } from "../../globalComponents/ModalWithBackdrop";
import Navbar from "../../globalComponents/Navbar";
import Spinner from "../../globalComponents/Spinner";
import { trpc } from "../../utils/trpc";
import { getBlogImage } from "./[underscoreBlogName]";


type ClientBlog = (Blog & {
    author: {
        name: string;
    };
})

type PageProps = {
    blogs: ClientBlog[]

}

export default function FeaturedBlogs(props: PageProps) {
    const { blogs: b } = props;
    const [blogs, setBlogs] = useState(b);
    const loadMoreMutation = trpc.blog.getBlogs.useMutation({
        onSuccess: (data) => {
            setBlogs([...blogs, ...data.blogs])
        }
    })
    const [modalShown, setModalShown] = useState(false);
    // const modalState = useModalContext()
    return (
        <div>
            <main className={`bg-primary min-h-screen text-minWhite flex flex-col gap-10 ${modalShown ? "h-screen w-screen overflow-hidden" : ""}`}>
                {/* <div className="w-screen"> */}
                <Navbar activeTab="Blogs" setModalShown={setModalShown}></Navbar>
                {/* </div> */}
                <div className="flex flex-col mx-10 lg:mx-20 gap-10 mb-4">
                    <p className="text-2xl md:text-4xl font-[700] font-complementry ">
                        FEATURED BLOGS
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3x gap-20">
                        {
                            blogs.map(b => {
                                return <BlogPreview blog={b} key={uuid()}></BlogPreview>
                            })
                        }
                    </div>
                    <div className="w-full grid md::grid-cols-[4.5fr_1fr_4.5fr] items-center justify-items-center">
                        {/* <div className="w-full h-2 rounded-md bg-cyan-300 hidden lg:block"></div> */}
                        <div className="w-full"></div>

                        <Button className="bg-secondary mx-2 md:w-fit w-full  text-md lg:text-lg" onClick={() => {
                            if (!loadMoreMutation.isLoading) {
                                loadMoreMutation.mutate({
                                    from: blogs.length, to: blogs.length + 5, sortBy: {
                                        property: "time"
                                    }
                                })
                            }
                        }}>{!loadMoreMutation.isLoading && "Load More" || <div className="mx-2 my-2">
                            <Spinner></Spinner>
                        </div>}</Button>
                        <div className="w-full"></div>
                        {/* <div className="w-full h-2 rounded-md bg-cyan-300 hidden md:block"></div> */}
                    </div>
                </div>
            </main>
        </div>
    )
}

function BlogPreview(props: { blog: ClientBlog }) {
    const { blog } = props;
    return <a href={`/blogs/${blog.titleLowered.replaceAll(" ", "_")}`}>
        <div className="bg-secondary rounded-lg h-[40vh] w-full flex-col hover:cursor-pointer">
            <div style={{
                backgroundImage: `url(${getBlogImage(blog.id)})`,
                backgroundSize: "cover"
            }} className="h-[25vh] w-full rounded-t-md">
            </div>
            {/* <div className="flex h-[10vh] w-full justify-start items-center"> */}
            <div className="grid grid-cols-2 h-[15vh] w-full">
                <div className="flex justify-start items-center mx-4">
                    <p className="font-[700] font-complementry text-3xl">{blog.title}</p>
                </div>
                <div className="flex justify-end">
                    <div className="grid grid-rows-2 justify-center items-center mx-4 gap-2 font-bold">
                        <div className="flex items-end justify-end h-full w-full">
                            <p className="">
                                {(new Date(Number(blog.publishedOn))).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-start h-full w-full">
                            <p className="">
                                {blog.author.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    </a>
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies?.token;
    const prisma = new PrismaClient()
    const blogCount = 5;
    let loggedIn = false;
    if (token) {
        const dbToken = await prisma.token.findFirst({ where: { value: token } });
        if (dbToken) {
            loggedIn = true;
        }
    }
    const latestBlogs = await prisma.blog.findMany({ where: { isTemp: false }, orderBy: { publishedOn: "desc" }, include: { author: { select: { name: true } } } })

    return {
        props: {
            loggedIn,
            blogs: latestBlogs.reverse().slice(0 - blogCount).reverse()
        }
    }
}