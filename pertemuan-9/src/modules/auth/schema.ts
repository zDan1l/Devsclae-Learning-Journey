import z from "zod"

export const registerSchema = z.object({
    email : z.email(),
    password : z.string().min(6, "Passsword at least 6 characters long")
})

export const loginSchema = z.object({
    email : z.email(),
    password : z.string().min(6, "Password at least 6 characters long")
})