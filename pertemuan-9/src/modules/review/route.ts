import { Hono } from "hono";
import { authMiddleware } from "../../middleware/authMiddleware.js";


export const reviewtRoute = new Hono()
    .use(authMiddleware)
    .get("/", async(c) => {
        return c.json({ reviews : []})
    })
    .get("/:id", async(c) => {
        return c.json({review : []})
    })