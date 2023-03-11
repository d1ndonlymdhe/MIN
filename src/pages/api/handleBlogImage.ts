import type { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"
import { PrismaClient } from "@prisma/client"
import Jimp from "jimp"
export default async function UploadImage(req: NextApiRequest, res: NextApiResponse) {
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
                        // if (newTitle !== playlist.name) {
                        //     await prisma.playList.update({ where: { id: playlist.id }, data: { ...playlist, name: newTitle } })
                        // }
                        const fileName = file.originalFilename
                        if (fileName) {
                            const ext = getExtension(fileName)
                            
                            if (ext == "jpeg") {
                                //if file is jpeg save as jpg
                                Jimp.read(file.filepath, (err, image) => {
                                    if (err) {
                                        res.status(500).json({ error: "unknown" })
                                        res.end()
                                    }
                                    image.quality(70).write(`./files/${dbToken.user.id}/blogs/${blog.id}/blogImage.jpg`)
                                })
                                res.status(200).json({ success: true })
                                res.end()
                            }
                            else if (ext !== "jpg") {
                                //if file is not jpg or jpeg convert to jpg
                                Jimp.read(file.filepath, (err, image) => {
                                    if (err) {
                                        res.status(500).json({ error: "unknown" })
                                        res.end()
                                    }
                                    image.quality(70).write(`./files/${dbToken.user.id}/blogs/${blog.id}/blogImage.jpg`)
                                })
                            }
                            else {
                                //if jpg save as is
                                Jimp.read(file.filepath, (err, image) => {
                                    if (err) {
                                        res.status(500).json({ error: "unknown" })
                                        res.end()
                                    }
                                    image.quality(70).write(`./files/${dbToken.user.id}/blogs/${blog.id}/blogImage.jpg`)
                                })
                            }
                            await prisma.blog.update({
                                where: {
                                    id: blogId
                                },
                                data: {
                                    coverFulfilled: true
                                }
                            })
                            res.status(200).json({ success: true, blogId: blogId })
                            res.end()


                        }
                    } else {
                        res.status(500).json({ error: "No playlist" })
                        res.end()

                    }
                }
                else {
                    res.status(500).json({ error: "No plId or file" })
                    res.end()

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