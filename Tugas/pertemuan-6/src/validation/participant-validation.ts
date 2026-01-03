import z from "zod";
export const participantValidation = z.object({
    name : z.string().min(1),
    email : z.string().min(5),
    eventId : z.string()
})
