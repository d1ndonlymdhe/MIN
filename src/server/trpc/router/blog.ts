import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { commentRouter } from "./comment"
import fs from "node:fs/promises"
export const blogRouter = router({
    createTempBlog: publicProcedure.input(z.object({ title: z.string(), hasImage: z.boolean() })).mutation((async ({ input, ctx }) => {
        const { prisma } = ctx
        const { title, hasImage } = input
        const token = ctx.req.cookies?.token;
        if (title && hasImage) {
            if (token) {
                const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } });
                if (dbToken) {
                    const user = dbToken.user;
                    const newTempBlog = await prisma.blog.create({
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