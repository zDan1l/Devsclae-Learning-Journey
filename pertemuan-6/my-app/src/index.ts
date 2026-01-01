import { serve } from '@hono/node-server'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { createProductSchema } from './validation.js'
import { prisma } from './prisma.js';

const app = new Hono()

app.get('/', async (c) => {

  const data = await prisma.todo.findMany();

  return c.json({data})
})

app.post("/", zValidator("json", createProductSchema) , (c)=>{

  const body = c.req.valid("json");

  return c.json({
    message : "your request successfull"
  })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
