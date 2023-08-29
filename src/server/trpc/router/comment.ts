import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const commentRouter = router({
    addComment: publicProcedure.input(z.object({ content: z.string().min(1), blogId: z.string().min(1), email: z.string().email(), name: z.string().min(1) })).mutation(async ({ input, ctx }) => {
        const { prisma } = ctx
        const { content, blogId, name, email } = input
        const blog = await prisma.blog.findFirst({ where: { id: blogId } })
        if (blog) {
            const newComment = await prisma.comment.create({
                data: {
                    content,
                    blogId,
                    email,
                    authorName: name
                }
            })
            return {
                success: true,
                content,
                blogId,
                authorName: name,
                commentId: newComment.id,
                email
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST"
        })
    }),
    reaction: publicProcedure.input(z.object({ commentId: z.string(), blogId: z.string(), type: z.boolean() })).mutation(async ({ input, ctx }) => {
        const { prisma } = ctx;
        const { commentId, blogId, type } = input;
        const token = ctx.req.cookies?.token;
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } });
            if (dbToken) {
                const user = dbToken.user;
                const comment = await prisma.comment.findFirst({ where: { id: commentId } })
                if (comment && comment.blogId == blogId) {
                    //find user reaction
                    const reactions = await prisma.commentReaction.findMany({ where: { AND: [{ commentId }, { userId: user.id }] } });
                    const userReaction = reactions[0]
                    if (userReaction) {
                        const updatedReaction = await prisma.commentReaction.update({
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
                        const newReaction = await prisma.commentReaction.create({
                            data: {
                                type,
                                commentId,
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
            code: "BAD_REQUEST"
        })
    }),
    deleteComment: publicProcedure.input(z.object({ commentId: z.string(), blogId: z.string() })).mutation(async ({ input, ctx }) => {
        const { prisma, req } = ctx;
        const { token } = req.cookies;
        const { commentId, blogId } = input;
        if (token) {
            const dbToken = await prisma.token.findFirst({ where: { value: token } })
            if (dbToken) {
                const dbuserId = dbToken.userId;
                //check if user owns blog;
                const dbBlog = await prisma.blog.findFirst({ where: { AND: [{ authorId: dbuserId }, { id: blogId }] } });
                if (dbBlog) {
                    //check if comment exists on blog;
                    const dbComment = await prisma.comment.findFirst({ where: { AND: [{ id: commentId }, { blogId: blogId }] } });
                    if (dbComment) {
                        console.log("deleting");
                        await prisma.comment.delete({ where: { id: commentId } });
                        return {
                            success: true,
                            commentId
                        }
                    }
                }
            }
        }
        throw new TRPCError({
            code: "BAD_REQUEST"
        })
    })
})