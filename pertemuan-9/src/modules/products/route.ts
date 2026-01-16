import { Hono } from "hono";
import { authMiddleware } from "../../middleware/authMiddleware.js";


export const productRoute = new Hono<{ Variables : {
    user : {
        id: number;
        email : string
    }
} }>()
    .use(authMiddleware)
    .get("/", async(c) => {
        const user = c.get("user");
        console.log(user)
        return c.json({products : []})
    })
    .get("/:id", async(c) => {
        return c.json({products : []})
    })