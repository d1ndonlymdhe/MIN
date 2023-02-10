import { z } from "zod"
import { publicProcedure, router } from "../trpc"
import crypto from "crypto"
import { TRPCError } from "@trpc/server";
import fs from "node:fs/promises"
export const authRouter = router({
    loginMutation: publicProcedure.input(z.object({ username: z.string(), password: z.string() })).mutation(async ({ input, ctx }) => {
        const { username, password } = input;
        const { prisma } = ctx
        if (username && password) {
            const user = await prisma.user.findFirst({ where: { username: username } })
            if (user) {
                const newHash = hash(password + user.salt)
                const token = hash(newHash + new Date().getTime().toString())
                if (newHash == user.passwordHash) {
                    await prisma.token.create({ data: { value: token, userId: user.id } })
                    return {
                        success: true,
                        token: token
                    }
                } else {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Wrong Password"
                    })
                }
            } else {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "No user"
                })
            }
        }
        else {
            throw new TRPCError({
                code: "BAD_REQUEST"
                ,
                message: "No password of username"
            })
        }
    }),
    signupMutation: publicProcedure.input(z.object({ username: z.string(), password: z.string(), name: z.string() })).mutation(async ({ input, ctx }) => {
        const { username, password, name } = input
        const { prisma } = ctx
        if (username && password) {
            //find if user exists
            const user = await prisma.user.findFirst({ where: { username: username } })
            if (user) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Username Taken"
                })
            } else {
                const salt = hash(username + new Date().getTime())
                const passwordHash = hash(password + salt)
                const newUser = await prisma.user.create({ data: { username: username, passwordHash: passwordHash, salt: salt, name: name } })
                //create a directory for storing future files need to use storage service like amazon s3
                fs.mkdir(`./files/${newUser.id}`)
                fs.mkdir(`./files/${newUser.id}/blogs`)
                fs.mkdir(`./files/${newUser.id}/images`)
                return {
                    success: true
                }
            }
        } else {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "No username or password"
            })
        }
    })
})


export function hash(input: string) {
    const hash = crypto.createHash('sha256').update(input).digest('base64')
    return hash
}