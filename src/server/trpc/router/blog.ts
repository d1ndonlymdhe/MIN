import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import { commentRouter } from "./comment"
export const blogRouter = router({
    createBlog: publicProcedure.input(z.object({ title: z.string(), content: z.string() })).mutation(async ({ input, ctx }) => {
        const { prisma } = ctx
        const { title, content } = input
        const token = ctx.req.cookies?.token
        if (token && title && content) {
            const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } })
            if (dbToken) {
                const user = dbToken.user
                const newBlog = await prisma.blog.create({ data: { title: title, content: content, authorId: user.id } })
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
        })
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
                    if (reactions) {
                        //user can have a single reaction in a blog
                        const userReaction = reactions[0]
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
                    } else {
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

            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST",
        })
    })
})