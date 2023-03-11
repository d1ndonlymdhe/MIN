import {  Blog, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next"
import uuid from "react-uuid";
import Navbar from "../../globalComponents/Navbar";


type ClientBlog = (Blog & {
    author: {
        name: string;
    };
})

type PageProps = {
    blogs: ClientBlog[]

}

export default function FeaturedBlogs(props: PageProps) {
    const { blogs } = props;



    return (
        <main className="bg-primary min-h-screen text-minWhite flex flex-col gap-10">
            {/* <div className="w-screen"> */}
            <Navbar activeTab="Blogs"></Navbar>
            {/* </div> */}
            <div className="flex flex-col mx-20 gap-10">
                <p className="text-4xl font-[700] font-complementry ">
                    FEATURED BLOGS
                </p>
                <div className="grid grid-cols-3 gap-20">
                    {
                        blogs.map(b => {
                            return <BlogPreview blog={b} key={uuid()}></BlogPreview>
                        })
                    }
                </div>
            </div>
        </main>
    )
}

function BlogPreview(props: { blog: ClientBlog }) {
    const { blog } = props;
    return <a href={`/blogs/${blog.titleLowered.replaceAll(" ", "_")}`}>
        <div className="bg-secondary rounded-lg h-[30vh] w-full flex-col hover:cursor-pointer">
            <div style={{
                backgroundImage: `url(/api/getBlogImage?blogId=${blog.id}&authorId=${blog.authorId})`,
                backgroundSize: "cover"
            }} className="h-[20vh] w-full rounded-t-md">
            </div>
            {/* <div className="flex h-[10vh] w-full justify-start items-center"> */}
                <div className="grid grid-cols-2 h-[10vh] w-full">
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
            blogs: latestBlogs.reverse().slice(0 - blogCount).reverse()
        }
    }
}