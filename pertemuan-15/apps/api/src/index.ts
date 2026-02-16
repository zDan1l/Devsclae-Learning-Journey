import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prisma } from "./utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema } from "./modules/users/schema.js";

const app = new Hono().get("/users", async (c) => {
	const users = await prisma.user.findMany();
	return c.json({
		users
	});
}).post("/users", zValidator("json", createUserSchema), async (c) => {
	const body = c.req.valid("json");
	const user = await prisma.user.create({
		data : {
			name: body.name,
			email: body.email,
		}
	});

	return c.json({
		user
	});
})

// export api scpecification
export type AppType = typeof app;

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
