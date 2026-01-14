import { Hono } from "hono";


export const productRoute = new Hono()
    .get("/", async(c) => {
        return c.json({products : []})
    })