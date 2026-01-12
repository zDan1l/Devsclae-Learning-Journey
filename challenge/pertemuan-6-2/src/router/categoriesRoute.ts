import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";

export const categoriesRoutes = new Hono()
    .get("/", async(e) => {
        try {
            const categories = await prisma.category.findMany({
                include : {
                    posts : true
                }
            })
            return e.json({ data : categories }, 200)
        } catch (error) {
            console.log({message : "Failed listing categories"}, error)
            return e.json({message : "Failed lisitng categories"}, 500)
        }
    })
    .get("/:id", async(e) => {
        const categoryId = e.req.param("id")
        try {
            const category = await prisma.category.findUnique({
                where : {
                    id : categoryId
                }, 
                include : {
                    posts : true
                }
            })
            return e.json({ data: category }, 200);
        } catch (error) {
            console.log({ message: `Failed listing categories id : ${categoryId}` }, 500);
            return e.json({ message: `Failed listing categories id : ${categoryId}` }, 500);
        }
    })
    .post("/", async(e) => {
        try {
            const body = await e.req.json()
            const category = await prisma.category.create({
                data : {
                    name : body.name,
                }
            })
            return e.json({data : category}, 201)
        } catch (error) {
            console.log({message : "Failed create category"}, 500)
            return e.json({message : "Failed create category"}, 500)
        }
    })
    .patch("/:id", async(e) => {
        const categoryId = e.req.param("id");
        try {
            const body = await e.req.json()
            const newCategory = await prisma.category.update({
                where :{
                    id : categoryId
                },
                data : {
                    name : body.name
                }
            })
            return e.json({ data : newCategory })
        } catch (error) {
            console.log(
              { message: `Failed update categories id : ${categoryId}` },
              500
            );
            return e.json(
              { message: `Failed update categories id : ${categoryId}` },
              500
            );
        }
    })
    .delete("/:id",  async(e) => {
        const categoryId = e.req.param("id")
        try {
            await prisma.category.delete({
                where : {
                    id : categoryId
                }
            })
            return e.json({ message : `Sucessfull deleted category id : ${categoryId}`}, 200)
        } catch (error) {
            console.log(
              { message: `Failed deleted categories id : ${categoryId}` },
              500
            );
            return e.json(
              { message: `Failed deleted categories id : ${categoryId}` },
              500
            );
        }
    })