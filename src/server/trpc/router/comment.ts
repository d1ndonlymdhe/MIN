import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const commentRouter = router({
    addComment: publicProcedure.input(z.object({ content: z.string(), blogId: z.string() })).mutation(async ({ input, ctx }) => {
        const { prisma } = ctx
        const { content, blogId } = input

        const token = ctx.req.cookies?.token
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token } })
            if (dbToken) {
                const blog = await prisma.blog.findFirst({ where: { id: blogId } })
                if (blog) {
                    const newComment = await prisma.comment.create({
                        data: {
                            content,
                            authorId: dbToken.userId,
                            blogId,
                        }
                    })
                    return {
                        success: true,
                        content,
                        blogId,
                        commentId: newComment.id
                    }
                }
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST"
        })
    })
})