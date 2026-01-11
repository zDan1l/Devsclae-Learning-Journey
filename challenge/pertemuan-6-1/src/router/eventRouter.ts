import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { eventValidation } from "../validation/events.js";


export const eventsRoute = new Hono()
    .get("/", async(c) => {
        try {
            const events = await prisma.event.findMany({
                include : {
                    participants: true
                }
            })
            return c.json({ data : events }, 200)
        } catch (error) {
            console.log({message : "Failed to load list event"}, error)
            return c.json({message : "Failed listing events"}, 500)
        }
    })
    .get("/:id", async(e) => {
        const eventId = await e.req.param("id")

        try {
            const event = await prisma.event.findUnique({
                where : {
                    id : eventId
                },
                include : {
                    participants : true
                }
            })
            return e.json({data : event}, 200)
        } catch (error) {
            console.log({message : "Failed listing events", error})
            return e.json({message : `Failed listing event with id : ${eventId}`}, 500)
        }
    })
    .post("/",zValidator("json", eventValidation) ,async(e) => {
        try {
            const body = await e.req.valid("json")
            const newEvent = await prisma.event.create({
                data : {
                    name : body.name,
                    description : body.description,
                    location : body.location,
                    dateTime : body.dateTime,
                    categoryId : body.categoryId
                }
            })
            return e.json({ data : newEvent }, 201)
        } catch (error) {
            console.log({message : "Failed create event", error})
            return e.json({message : "Failed created event"}, 500)
        }
    })
    .patch("/:id", zValidator("json", eventValidation) ,async(e) => {
        const eventId = await e.req.param("id")
        try {
            const body = await e.req.valid("json")
            const updateEvent = await prisma.event.update({
                where: {
                    id: eventId,
                },
                data: {
                    name: body.name,
                    description: body.description,
                    location: body.location,
                    dateTime: body.dateTime,
                    categoryId: body.categoryId,
                }
            });

            return e.json({ data : updateEvent}, 200)
        } catch (error) {
            console.log({ message: "Failed update event", error });
            return e.json({ message: "Failed updated event" }, 500);
        }
    })
    .delete("/:id", async(e) => {
        const eventId = await e.req.param("id")
        try {
            await prisma.event.delete({
                where : {
                    id : eventId
                }
            })
            return e.json({message : `Sucessfull delete Event with id : ${eventId}`}, 200)
        } catch (error) {
            console.log({ message: "Failed delete event", error });
            return e.json({ message: "Failed deleted event" }, 500);
        }
    })

