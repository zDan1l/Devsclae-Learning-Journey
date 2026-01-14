import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { postsValidation } from "../validation/postsValidation.js";

export const postsRoutes = new Hono()
    .get("/", async(e) => {
        try {
            const posts = await prisma.post.findMany()
            return e.json({ data : posts }, 200)
        } catch (error) {
            console.log({message : "Failed listing posts"}, error)
            return e.json({message : "Failed listing posts"}, 500)
        }
    })
    .get("/:id", async(e) => {
        const postId = e.req.param("id")
        try {
            const post = await prisma.post.findUnique({
                where : {
                    id : postId
                }
            })
            return e.json({ data: post }, 200);
        } catch (error) {
            console.log({ message: `Failed listing posts id : ${postId}` }, 500);
            return e.json({ message: `Failed listing posts id : ${postId}` }, 500);
        }
    })
    .post("/", zValidator("json", postsValidation) ,async(e) => {
        try {
            const body = await e.req.valid("json")
            const post = await prisma.post.create({
                data : {
                    title : body.title,
                    content : body.content,
                    published : body.published,
                    authorId : body.authorId,
                    categoryId : body.categoryId
                }
            })
            return e.json({data : post}, 201)
        } catch (error) {
            console.log({message : "Failed create post"}, 500)
            return e.json({message : "Failed create post"}, 500)
        }
    })
    .patch("/:id", zValidator("json", postsValidation) ,async(e) => {
        const postId = e.req.param("id");
        try {
            const body = await e.req.valid("json")
            const newpost = await prisma.post.update({
              where: {
                id: postId,
              },
              data: {
                title: body.title,
                content: body.content,
                published: body.published,
                authorId: body.authorId,
                categoryId: body.categoryId,
              },
            });
            return e.json({ data : newpost }, 200)
        } catch (error) {
            console.log(
              { message: `Failed update posts id : ${postId}` },
              500
            );
            return e.json(
              { message: `Failed update posts id : ${postId}` },
              500
            );
        }
    })
    .delete("/:id",  async(e) => {
        const postId = e.req.param("id")
        try {
            await prisma.post.delete({
                where : {
                    id : postId
                }
            })
            return e.json({ message : `Sucessfull deleted post id : ${postId}`}, 200)
        } catch (error) {
            console.log(
              { message: `Failed deleted posts id : ${postId}` },
              500
            );
            return e.json(
              { message: `Failed deleted posts id : ${postId}` },
              500
            );
        }
    })