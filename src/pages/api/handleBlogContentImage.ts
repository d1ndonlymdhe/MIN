import type { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"
import { PrismaClient } from "@prisma/client"
import { v2 as cloudinary } from "cloudinary"

const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
})

export default async function handleBlogContentImage(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token
    console.log("token = ", token)
    if (token) {
        const prisma = new PrismaClient()
        const dbToken = await prisma.token.findFirst({ where: { value: token }, include: { user: true } })
        console.log("dbtoken = ", dbToken)
        if (dbToken) {
            const form = new formidable.IncomingForm()
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.log("error  = ", err)
                    res.status(500).json({ error: "Bad Form" })
                    res.end()
                    // return
                }
                const { blogId } = <{ blogId: string }>fields
                const file = <formidable.File>files.blogImage
                // console.log(fields,file.originalFilename)
                if (blogId && file) {
                    const blogs = await prisma.blog.findMany({ where: { AND: [{ id: blogId }, { authorId: dbToken.user.id }] } })
                    const blog = blogs[0]
                    if (blog) {
                        const fileName = file.originalFilename
                        if (fileName) {
                            const ext = getExtension(fileName)
                            const imgName = fileName.replace(`.${ext}` || "", "");
                            const newBlogImage = await prisma.blogImage.create({ data: { fulfilled: true, blogId: blog.id, name: imgName } })
                            cloudinary.uploader.upload(file.filepath, {
                                public_id: `blogs/${blogId}/images/${newBlogImage.id}`,
                                format: "jpg"
                            }, () => {

                                res.status(200).json({
                                    imgName,
                                    blogId,
                                    newImgId: newBlogImage.id,
                                    success: true
                                })
                            })
                        } else {
                            res.status(500).json({ error: "No Blog" })
                            res.end()
                        }
                    }
                    else {
                        res.status(500).json({ error: "No plId or file" })
                        res.end()
                    }
                }
            })
        } else {
            res.status(500).json({ error: "No TokeN" })
            res.end()
        }
    }

}


export function getExtension(fileName: string) {
    const splits = fileName.split(".");
    return splits[splits.length - 1]
}

export const config = {
    api: {
        bodyParser: false
    }
}