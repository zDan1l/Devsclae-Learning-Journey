import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { categoryValidation } from "../validation/categories.js";


export const categoriesRoute = new Hono()
    .get("/", async(c) => {
        try {
            const categorys = await prisma.category.findMany({
                include : {
                    events: true
                }
            })
            return c.json({ data : categorys }, 200)
        } catch (error) {
            console.log({message : "Failed to load list category"}, error)
            return c.json({message : "Failed listing categories"}, 500)
        }
    })
    .get("/:id", async(e) => {
        const categoryId = e.req.param("id") 
        try {
            const category = await prisma.category.findFirst({
                where : {
                    id : categoryId
                },
                include : {
                    events : true
                }
            })
            return e.json({data : category}, 200)
        } catch (error) {
            console.log({message : "Failed listing categorys", error})
            return e.json({message : `Failed listing category with id : ${categoryId}`}, 500)
        }
    })
    .post("/", zValidator("json", categoryValidation) ,async(e) => {
        try {
            const body = await e.req.valid("json")
            const newCategory = await prisma.category.create({
                data : {
                    name : body.name
                }
            })
            return e.json({ data : newCategory }, 201)
        } catch (error) {
            console.log({message : "Failed create category", error})
            return e.json({message : "Failed created categories"}, 500)
        }
    })
    .patch("/:id", zValidator("json", categoryValidation ) ,async(e) => {
        const categoryId = e.req.param("id")
        try {
            const body = await e.req.valid("json")
            const updateCategory = await prisma.category.update({
                where: {
                    id: categoryId,
                },
                data: {
                    name: body.name
                }
            });

            return e.json({ data : updateCategory}, 200)
        } catch (error) {
            console.log({ message: "Failed update category", error });
            return e.json({ message: "Failed updated categories" }, 500);
        }
    })
    .delete("/:id", async(e) => {
        const categoryId = e.req.param("id")
        try {
            await prisma.category.delete({
                where : {
                    id : categoryId
                }
            })
            return e.json({message : `Sucessfull delete category with id : ${categoryId}`}, 200)
        } catch (error) {
            console.log({ message: "Failed delete category", error });
            return e.json({ message: "Failed deleted category" }, 500);
        }
    })

