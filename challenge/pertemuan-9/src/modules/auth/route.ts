import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { loginSchema, registerSchema } from "./schema.js";
import { prisma } from "../../utils/prisma.js";
import { HTTPException } from "hono/http-exception";
import { comparePassword, hashedPassword } from "./utils.js";
import jwt from "jsonwebtoken"

export const authRoute = new Hono()
    .post("/register",zValidator("json", registerSchema)  ,async(c) => {
        // 1 check collision
        const body = c.req.valid("json")

        const existingUser = await prisma.user.findUnique({
            where :{
                email : body.email
            }
        })

        if(existingUser){
            throw new HTTPException(409, {message : "User already use"})
        }

        // 2 create new User with hashed password
        const newUser = await prisma.user.create({
            data : {
                email : body.email,
                password : await hashedPassword(body.password)
            }
        })

        return c.json({message : "Register Sucessfull", newUser}, 200)
    })
    .post("/login", zValidator("json", loginSchema) ,async(c) => {
        const body = c.req.valid("json");

        const existingUser = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });

        if (!existingUser) {
          throw new HTTPException(409, { message: "User not found" });
        }

        const hashed = comparePassword(body.password, existingUser.password)

        if(!hashed){
            throw new HTTPException(404, {message : "Wrong password"})
        }

        const token = jwt.sign({id : existingUser.id}, process.env.JWT_SECRET!)

        return c.json({message : "Login Sucessfull", token}, 200)
    })