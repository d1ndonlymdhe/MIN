import { TRPCError } from "@trpc/server"
import { z, ZodAny, ZodArray, ZodString } from "zod"
import { publicProcedure, router } from "../trpc"
import { commentRouter } from "./comment"
import fs from "node:fs/promises"
import { Blog } from "@prisma/client"

export const blogRouter = router({
    createEmptyBlog: publicProcedure.mutation((async ({ ctx }) => {
        const { prisma } = ctx
        const token = ctx.req.cookies?.token;
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } })
            if (dbToken) {
                const blogCount = await prisma.blog.count({ where: { authorId: dbToken.userId } })
                const newEblog = await prisma.blog.create({
                    data: {
                        content: "",
                        title: `Blog ${blogCount + 1}`,
                        titleLowered: `blog ${blogCount + 1}`,
                        authorId: dbToken.userId,
                        coverFulfilled: false,
                        isTemp: true,
                    }
                })
                await fs.mkdir(`./files/${dbToken.userId}/blogs/${newEblog.id}`)
                await fs.mkdir(`./files/${dbToken.userId}/blogs/${newEblog.id}/images`)
                return {
                    newBlog: newEblog
                }
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST"
        })
    })),
    createTempBlog: publicProcedure.input(z.object({ title: z.string(), hasImage: z.boolean() })).mutation((async ({ input, ctx }) => {
        const { prisma } = ctx
        const { title, hasImage } = input
        const token = ctx.req.cookies?.token;
        if (title && hasImage) {
            if (token) {
                const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } });
                if (dbToken) {
                    const user = dbToken.user;
                    const newTempBlog: Blog = await prisma.blog.create({
                        data: {
                            content: "",
                            title: title,
                            titleLowered: title.toLowerCase(),
                            authorId: user.id,
                            isTemp: true
                        }
                    })
                    await fs.mkdir(`./files/${user.id}/blogs/${newTempBlog.id}`)
                    await fs.mkdir(`./files/${user.id}/blogs/${newTempBlog.id}/images`)
                    if (newTempBlog) {
                        return {
                            newBlog: newTempBlog
                        }
                    }
                }
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST"
        })
    }
    )),
    addContent: publicProcedure.input(z.object({ blogId: z.string(), content: z.string().or(z.undefined()), title: z.string().or(z.undefined()), hasImage: z.boolean() })).mutation(async ({ input, ctx }) => {
        const { prisma } = ctx;
        const { blogId, content, title, hasImage } = input;
        const token = ctx.req.cookies?.token;
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } });
            if (dbToken) {
                const blog = await prisma.blog.findFirst({ where: { AND: [{ id: blogId }, { authorId: dbToken.userId }] } })
                if (blog) {
                    const newBlog = await prisma.blog.update({
                        where: { id: blogId }, data: {
                            ...blog,
                            content: content ? content : blog.content,
                            title: title ? title : blog.title,
                            titleLowered: title ? title.toLocaleLowerCase() : blog.titleLowered,
                            coverFulfilled: !hasImage,
                        }
                    })
                    return {
                        success: true,
                        newBlog: newBlog
                    }
                }
            }
        }
        throw new TRPCError({
            code: "NOT_FOUND"
        })
    }),
    deleteBlog: publicProcedure.input(z.object({ blogId: z.string() })).mutation(async ({ input, ctx }) => {
        const { blogId } = input;
        const { prisma } = ctx;
        const token = ctx.req.cookies?.token;
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token } })
            if (dbToken) {
                const blog = await prisma.blog.findFirst({ where: { AND: [{ id: blogId }, { authorId: dbToken.userId }] } });
                if (blog) {
                    const dBlog = await prisma.blog.delete({ where: { id: blog.id } });
                    return {
                        blog: dBlog
                    }
                }
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST"
        })
    }),
    publishBlog: publicProcedure.input(z.object({ blogId: z.string() })).mutation(async ({ input, ctx }) => {
        const prisma = ctx.prisma;
        const { blogId } = input;
        const token = ctx.req.cookies?.token;
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token } })
            if (dbToken) {
                const blog = await prisma.blog.findFirst({ where: { AND: [{ id: blogId }, { authorId: dbToken.userId }] } });
                if (blog && blog.coverImageid && blog.content && blog.title) {
                    const pBlog = await prisma.blog.update({ where: { id: blogId }, data: { ...blog, isTemp: false } })
                    return {
                        blog: pBlog
                    }
                }
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST"
        })
    }),
    createBlog: publicProcedure.input(z.object({ title: z.string(), content: z.string() })).mutation(async ({ input, ctx }) => {
        const { prisma } = ctx
        const { title, content } = input
        const token = ctx.req.cookies?.token
        if (token && title && content) {
            const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } })
            if (dbToken) {
                const user = dbToken.user
                const newBlog = await prisma.blog.create({ data: { title: title, titleLowered: title.toLowerCase(), content: content, authorId: user.id } })
                await fs.mkdir(`./files/${user.id}/blogs/${newBlog.id}`)
                await fs.mkdir(`./files/${user.id}/blogs/${newBlog.id}/images`)
                return {
                    success: true,
                    title: title,
                    content: content
                }
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error"
        });
    }),
    comment: commentRouter,
    reaction: publicProcedure.input(z.object({ type: z.boolean(), blogId: z.string() })).mutation(async ({ input, ctx }) => {
        const { prisma } = ctx
        const { type, blogId } = input
        const token = ctx.req.cookies?.token
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } })
            if (dbToken) {
                const user = dbToken.user;
                const blog = await prisma.blog.findFirst({ where: { id: blogId } })
                if (blog) {
                    //find user reaction
                    const reactions = await prisma.blogReaction.findMany({ where: { AND: [{ blogId, userId: user.id }] } })
                    const userReaction = reactions[0]

                    //user can have a single reaction in a blog
                    if (userReaction) {
                        const updatedReaction = await prisma.blogReaction.update({
                            where: { id: userReaction.id }, data: {
                                ...userReaction,
                                type
                            }
                        })
                        return {
                            success: true,
                            reaction: updatedReaction
                        }
                    }
                    else {
                        const newReaction = await prisma.blogReaction.create({
                            data: {
                                type,
                                blogId,
                                userId: user.id,
                            }
                        })
                        return {
                            success: true,
                            reaction: newReaction
                        }
                    }

                }
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "no blog"
                })
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "no token"
        })
    })
})