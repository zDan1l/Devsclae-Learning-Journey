import z from "zod";

export const registerSchema = z.object({
    email : z.string().min(5),
    password : z.string().min(6, "Password must be al least 6 character")
})
export const loginSchema = z.object({
    email : z.string().min(5),
    password : z.string().min(6, "Password must be al least 6 character")
})