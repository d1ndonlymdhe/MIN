import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies?.token;
    const prisma = new PrismaClient()
    const blogCount = 3;
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