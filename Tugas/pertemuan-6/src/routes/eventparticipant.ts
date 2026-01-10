import { Hono } from "hono";    
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { participantValidation } from "../validation/participant-validation.js";

export const participantsRoute = new Hono()
    .get('/', async (c) => {
        try {
          const participant = await prisma.participant.findMany();
          return c.json({ data: participant }, 200)
        } catch (error) {
          console.log("Failed listing participants:", error);
          return c.json({message : "Failed listing participants"}, 500)
        }
    })
    .get('/:id', async (c) => {
        const id = c.req.param('id')
        try {
          const participant = await prisma.participant.findFirst({
            where: {
              id: id,
            },
          });
          return c.json({ data: participant }, 200)
        } catch (error) {
          console.log(`Failed getting participant ${id}: `, error);
          return c.json({message : `Failed getting participant ${id}`}, 500)
        }
    })
    .post('/', zValidator("json", participantValidation), async (c) => {
      try {
        const body =  c.req.valid("json");
        const idEvent = await prisma.event.findUnique({  where : {id : body.eventId } });
        if (!idEvent) {
          console.log("Failed finding id event:");
          return c.json({message : "Failed finding id event"}, 500)
        }
        const newParticipant = await prisma.participant.create({
          data: {
            name: body.name,
            email : body.email,
            eventId : body.eventId
          },
        });
        return c.json({ data: newParticipant }, 201);
      } catch (error) {
        console.log("Failed creating participant:", error);
        return c.json({message : "Failed creating participant"}, 500)
      }
    })
    .patch('/:id', zValidator("json", participantValidation), async (c) => {
        const id = await c.req.param("id");
        try {
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
          return c.json({ data: updateParticipant }, 200);
        } catch (error) {
          console.log(`Failed updating participant ${id}: `, error);
          return c.json({message : `Failed updating participant ${id}`}, 500)
        }
    })
    .delete('/:id', async (c) => {
        const id = c.req.param("id");
        try {
          await prisma.participant.delete({
            where: {
              id: id,
            },
          });
          return c.json({ message: "Successfull delete Participant" }, 200);
        } catch (error) {
          console.log(`Failed deleting participant ${id}: `, error);
          return c.json({message : `Failed deleting participant ${id}`}, 500)
        }
    })




