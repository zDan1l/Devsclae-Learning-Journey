import { Hono } from "hono";    
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { participantValidation } from "../validation/participant-validation.js";

export const participantsRoute = new Hono()
    .get('/', async (c) => {
        const participant = await prisma.participant.findMany();
        return c.json({ participant })
    })
    .get('/:id', async (c) => {
        const id = c.req.param('id')
        const participant = await prisma.participant.findFirst({
          where: {
            id: id,
          },
        });
        return c.json({
            participant
        })
    })
    .post('/', zValidator("json", participantValidation), async (c) => {
        const body =  c.req.valid("json");
        const newParticipant = await prisma.participant.create({
          data: {
            name: body.name,
            email : body.email,
            eventId : body.eventId
          },
        });
        return c.json({ event: newParticipant });
    })
    .patch('/:id', zValidator("json", participantValidation), async (c) => {
        const id = await c.req.param("id");
        const body = c.req.valid("json");
        const updateParticipant = await prisma.participant.update({
          where: {
            id: id,
          },
          data: {
            name: body.name,
            email: body.email,
            eventId: body.eventId,
          },
        });
        return c.json({ event: updateParticipant });
    })
    .delete('/:id', async (c) => {
        const id = c.req.param("id");
        await prisma.participant.delete({
          where: {
            id: id,
          },
        });
        return c.json({ message: "Successfull delete Participant" });
    })




