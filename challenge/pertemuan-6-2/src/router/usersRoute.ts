import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";

export const usersRoutes = new Hono()
    .get("/", async(e) => {
        try {
            const users = await prisma.user.findMany({
                include : {
                    posts : true
                }
            })
            return e.json({ data : users }, 200)
        } catch (error) {
            console.log({message : "Failed listing users"}, error)
            return e.json({message : "Failed lisitng users"}, 500)
        }
    })
    .get("/:id", async(e) => {
        const userId = e.req.param("id")
        try {
            const user = await prisma.user.findUnique({
                where : {
                    id : userId
                }, 
                include : {
                    posts : true
                }
            })
            return e.json({ data: user }, 200);
        } catch (error) {
            console.log({ message: `Failed listing users id : ${userId}` }, 500);
            return e.json({ message: `Failed listing users id : ${userId}` }, 500);
        }
    })
    .post("/", async(e) => {
        try {
            const body = await e.req.json()
            const user = await prisma.user.create({
                data : {
                    name : body.name,
                    email : body.email
                }
            })
            return e.json({data : user}, 201)
        } catch (error) {
            console.log({message : "Failed create user"}, 500)
            return e.json({message : "Failed create user"}, 500)
        }
    })
    .patch("/:id", async(e) => {
        const userId = e.req.param("id");
        try {
            const body = await e.req.json()
            const newuser = await prisma.user.update({
              where: {
                id: userId,
              },
              data: {
                name: body.name,
                email: body.email,
              },
            });
            return e.json({ data : newuser })
        } catch (error) {
            console.log(
              { message: `Failed update users id : ${userId}` },
              500
            );
            return e.json(
              { message: `Failed update users id : ${userId}` },
              500
            );
        }
    })
    .delete("/:id",  async(e) => {
        const userId = e.req.param("id")
        try {
            await prisma.user.delete({
                where : {
                    id : userId
                }
            })
            return e.json({ message : `Sucessfull deleted user id : ${userId}`}, 200)
        } catch (error) {
            console.log(
              { message: `Failed deleted users id : ${userId}` },
              500
            );
            return e.json(
              { message: `Failed deleted users id : ${userId}` },
              500
            );
        }
    })