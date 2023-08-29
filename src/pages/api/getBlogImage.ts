import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs/promises"
import { createReadStream } from "node:fs";
export default async function getBlogImage(req: NextApiRequest, res: NextApiResponse) {
    const { blogId, authorId } = req.query
    if (typeof blogId == "string" && typeof authorId == "string") {
        const prisma = new PrismaClient()
        const blog = await prisma.blog.findFirst({ where: { AND: [{ id: blogId }, { authorId: authorId }] } });
        if (blog) {
            try {
                const rs = createReadStream(`./files/${authorId}/blogs/${blogId}/blogImage.jpg`)
                rs.pipe(res)
            } catch (err) {
                res.status(404).send("Not Found")
            }
        }
    }
}