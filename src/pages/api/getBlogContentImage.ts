import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream } from "node:fs";
export default async function getBlogImage(req: NextApiRequest, res: NextApiResponse) {
    const { blogId, authorId, imageId } = req.query
    if (typeof blogId == "string" && typeof authorId == "string" && typeof imageId == "string") {
        const prisma = new PrismaClient()
        const blog = await prisma.blog.findFirst({ where: { AND: [{ id: blogId }, { authorId: authorId }] } });

        if (blog) {
            const image = await prisma.blogImage.findFirst({ where: { AND: [{ id: imageId }, { blogId: blogId }] } })
            if (image) {
                try {
                    const rs = createReadStream(`./files/${authorId}/blogs/${blogId}/images/${imageId}/${image.name}.jpg`)
                    rs.pipe(res)
                } catch (err) {
                    res.status(404).send("Not Found")
                }
            }
        }
    }
}