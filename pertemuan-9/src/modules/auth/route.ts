import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { loginSchema, registerSchema } from "./schema.js";
import { prisma } from "../../utils/prisma.js";
import { HTTPException } from "hono/http-exception";
import { comparePassword, hashedPassword } from "./utils.js";
import  jwt  from "jsonwebtoken"


export const authRoute = new Hono()
    .post("/register", zValidator("json", registerSchema) , async (c) => {
        // cek collision
        const body = c.req.valid("json")

        const existingUser = await prisma.user.findUnique({
            where : {
                email : body.email
            }
        })

        if(existingUser){
            throw new HTTPException(409, {message : "Email already user"})
        }

        // create user
        const newUser = await prisma.user.create({
            data : {
                email : body.email,
                // hashed password dengan function di file utils
                password : await hashedPassword(body.password)
            }
        })

        return c.json({ message: "Registered Sucessfull", newUser });
    })
    .post("/login", zValidator("json", loginSchema) ,async(c) => {
        const body = c.req.valid("json");

        const existingUser = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });

        if (!existingUser) {
          throw new HTTPException(404, { message: "User not found" });
        }

        const isPasswordValid = await comparePassword(body.password, existingUser.password)
        if (!isPasswordValid) {
            throw new HTTPException(404, { message: "Password war wrong" });
        }

        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!)

        return c.json({message : "Login Sucessfull", token})
    })


