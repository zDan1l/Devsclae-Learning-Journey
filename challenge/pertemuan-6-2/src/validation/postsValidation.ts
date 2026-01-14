import z from "zod";


export const postsValidation = z.object({
    title : z.string().min(10),
    content : z.string().min(20),
    published : z.boolean(),
    authorId : z.string(),
    categoryId : z.string()  
})