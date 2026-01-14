import z from "zod";
export const usersValidation = z.object({
    name : z.string().min(5),
    email : z.string().min(5)
})