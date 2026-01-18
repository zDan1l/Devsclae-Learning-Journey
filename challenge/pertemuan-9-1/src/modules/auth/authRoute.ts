import { Hono } from "hono";
import { prisma } from "../../utils/prisma.js";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "./schema.js";
import { comparePw, hashedPw } from "./utils.js";
import  jwt  from "jsonwebtoken"

export const authRoute = new Hono()
    .post("/register", zValidator("json", registerSchema) ,async (c) => {
        // cek collision
        const body = c.req.valid("json")
        const existUser = await prisma.user.findUnique({
            where : {
                email : body.email
            }
        })

        if(existUser) { 
            throw new HTTPException(409, {message : "User already exist"})
        }

        // create user
        const newUser = await prisma.user.create({
            data : {
                email : body.email,
                password : await hashedPw(body.password)
            }
        })
        return c.json({message : "Sucessful Register", newUser})
    })
    .post("/login", zValidator("json", loginSchema) ,async(c) => {
        const body = c.req.valid("json");
        const existUser = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });

        if (!existUser) {
          throw new HTTPException(409, { message: "User not found" });
        }

        const isPwValid = comparePw(body.password, existUser.password)

        if(!isPwValid){
            throw new HTTPException(409, { message: "Email or Password is wrong" });
        }

        // pemberian token
        const token  = jwt.sign({sub : existUser.id}, process.env.JWT_SECRET!)
    
        return c.json({message : "Sucessfull Login", token})
    })