import z from "zod";
export const participantValidation = z.object({
    name : z.string().min(3),
    email : z.string().min(5),
    eventId : z.string().min(10)
})