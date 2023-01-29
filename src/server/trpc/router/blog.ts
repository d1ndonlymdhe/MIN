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
    })
    ,
    comment: commentRouter

})