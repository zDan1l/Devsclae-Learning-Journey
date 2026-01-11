import z from "zod";

export const eventValidation = z.object({
    name : z.string().min(1),
    description : z.string().min(10),
    location : z.string().min(3),
    dateTime : z.string().min(5),
    categoryId : z.string().min(4)
})