import { Hono } from "hono";    
import { prisma } from '../utils/prisma.js';
import { zValidator } from "@hono/zod-validator";
import { eventValidation } from "../validation/event-validation.js";

export const eventsRoute = new Hono()
  .get("/", async (c) => {
    try {
      const events = await prisma.event.findMany({
        include: {
          participants: true,
        },
      });
      return c.json({ data : events }, 200);
    } catch (error) {
      console.log("Failed listing events:", error);
      // status code 200: default OK, 201: created, 400: bad request,404: not found, 500 : server error
      return c.json({message : "Failed listing events"}, 500)
    }
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    try {
      const event = await prisma.event.findFirst({
        where: {
          id: id,
        },
        include: {
          participants: true,
        },
      });
      return c.json({ data : event }, 200);
    } catch (error) {
      console.log(`Failed getting event ${id}: `, error);
      return c.json({message : `Failed getting event ${id}`}, 500)
    }
  })
  .post("/", zValidator("json", eventValidation), async (c) => {
    try {
      const body = c.req.valid("json");
      const newEvent = await prisma.event.create({
        data: {
          name: body.name,
          description: body.description,
          location: body.location,
          dateTime: body.dateTime,
        },
      });
      return c.json({ data: newEvent }, 201);
    } catch (error) {
      console.log("Failed creating event:", error);
      return c.json({message : "Failed creating event"}, 500)
    }
  })
  .patch("/:id", zValidator("json", eventValidation), async (c) => {
    const id = await c.req.param("id");
    try {
      const body = c.req.valid("json");
      const updateEvent = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
          description: body.description,
          location: body.location,
          dateTime: body.dateTime,
        },
      });
      return c.json({ data: updateEvent }, 200);
    } catch (error) {
      console.log(`Failed updating event ${id}: `, error);
      return c.json({message : `Failed updating event ${id}`}, 500)
    }
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    try {
      await prisma.event.delete({
        where: {
          id: id,
        },
      });
      return c.json({ message: "Successfull delete event" }, 200);
    } catch (error) {
      console.log(`Failed deleting event ${id}: `, error);
      return c.json({message : `Failed deleting event ${id}`}, 500)
    }
  });



