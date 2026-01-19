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
        return c.json({message : "Sucessful Register", user: {
            id: newUser.id,
            email : newUser.email
        }})
    })
    .post("/login", zValidator("json", loginSchema) ,async(c) => {
        const body = c.req.valid("json");
        const existUser = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });

        if (!existUser) {
          throw new HTTPException(404, { message: "User not found" });
        }

        const isPwValid = await comparePw(body.password, existUser.password)

        if(!isPwValid){
            throw new HTTPException(401, { message: "Email or Password is wrong" });
        }

        // pemberian token
        const token  = jwt.sign({sub : existUser.id}, process.env.JWT_SECRET!, {expiresIn : '20m'})

        // generate refresh token buat cadangan
        const refreshToken = jwt.sign({sub : existUser.id}, process.env.JWT_REFRESH_SECRET!, {expiresIn: '1d'})
 
        await prisma.user.update({
            where: {
                id: existUser.id,
            },
            data : {
                refreshToken
            }
        })
        
        return c.json({message : "Sucessfull Login", token, refreshToken})
    })
    .post("/refresh", async(c) => {
        const {refreshToken} = await c.req.json()

        // verify refresh token
        try {
            const payload = jwt.verify(
              refreshToken,
              process.env.JWT_REFRESH_SECRET!,
            );
            // cek di database
            const user = await prisma.user.findFirst({
                where : {
                    id : String (payload.sub),
                    refreshToken : refreshToken
                }
            })
    
            // jika tidak cocok throw error
            if(!user) {
                throw new HTTPException(401, {message : "Invalid refresh token"})
            }
    
            const newToken = jwt.sign({sub : user.id}, process.env.JWT_SECRET!, {expiresIn : "20m"})
            return c.json({newToken : newToken})
        } catch (error) {
            if (error instanceof Error && error.name === "TokenExpiredError") {
              throw new HTTPException(401, {
                message: "Refresh token expired",
              });
            }
            throw new HTTPException(401, {message : "Invalid token"})
        }
    })