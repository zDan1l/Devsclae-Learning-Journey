import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import jwt from "jsonwebtoken"
import { authMiddleware } from "../../middleware/authMiddleware.js";

export const productRoute = new Hono()
    .use(authMiddleware)
    .get("/", async(c) => {
        return c.json({ products : [] })
    })
    .get("/:id", async(c) => {
        return c.json({ products : [] })
    })