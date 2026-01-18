import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import jwt from "jsonwebtoken"
import { authMiddleware } from "../../middleware/authMiddleware.js";

export const productsRoute = new Hono<{Variables : {
    user : {
        id : string;
        email : string
    }
}}>()
    .use(authMiddleware)
    .get("/", async(c) => {
        const user = c.get("user")
        return c.json({ products : [], user })
    })
    .get("/:id", async(c) => {
        return c.json({product : []})
    })