import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { participantValidation } from "../validation/participants.js";


export const participantsRoute = new Hono()
    .get("/", async(c) => {
        try {
            const participant = await prisma.participant.findMany()
            return c.json({ data : participant }, 200)
        } catch (error) {
            console.log({message : "Failed to load list participant"}, error)
            return c.json({message : "Failed listing participant"}, 500)
        }
    })
    .get("/:id", async(e) => {
        const participantId = e.req.param("id")

        try {
            const participant = await prisma.participant.findUnique({
                where : {
                    id : participantId
                }
            })
            return e.json({data : participant}, 200)
        } catch (error) {
            console.log({message : "Failed listing participants", error})
            return e.json({message : `Failed listing participant with id : ${participantId}`}, 500)
        }
    })
    .post("/", zValidator("json", participantValidation) ,async(e) => {
        try {
            const body = await e.req.valid("json")
            const newParticipant = await prisma.participant.create({
                data : {
                    name : body.name,
                    email : body.email,
                    eventId : body.eventId
                }
            })
            return e.json({ data : newParticipant }, 201)
        } catch (error) {
            console.log({message : "Failed create participant", error})
            return e.json({message : "Failed created participant"}, 500)
        }
    })
    .patch("/:id", zValidator("json", participantValidation) ,async(e) => {
        const participantId = e.req.param("id")
        try {
            const body = await e.req.valid("json")
            const updateParticipant = await prisma.participant.update({
              where: {
                id: participantId,
              },
              data: {
                name: body.name,
                email: body.email,
                eventId: body.eventId,
              },
            });

            return e.json({ data : updateParticipant}, 200)
        } catch (error) {
            console.log({ message: "Failed update participant", error });
            return e.json({ message: "Failed updated participant" }, 500);
        }
    })
    .delete("/:id", async(e) => {
        const participantId = e.req.param("id")
        try {
            await prisma.participant.delete({
                where : {
                    id : participantId
                }
            })
            return e.json({message : `Sucessfull delete participant with id : ${participantId}`}, 200)
        } catch (error) {
            console.log({ message: "Failed delete participant", error });
            return e.json({ message: "Failed deleted participant" }, 500);
        }
    })

