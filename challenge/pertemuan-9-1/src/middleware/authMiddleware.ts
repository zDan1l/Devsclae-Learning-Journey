import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import jwt from "jsonwebtoken"
import { prisma } from "../utils/prisma.js";



export const authMiddleware = createMiddleware(async (c, next) => {
  const token = c.req.header("token");
    if (!token) {
        throw new HTTPException(201, { message: "Unauthorized" });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await prisma.user.findFirst({
            where : {
                id : String(payload.sub)
            },
            select : {
                id : true,
                email : true
            }
        })

        c.set("user" , user)
        await next();
    } catch (error) {
        throw new HTTPException(401, { message: "invalid token" });
    }
});