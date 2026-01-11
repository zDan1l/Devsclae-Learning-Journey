import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { eventsRoute } from './router/eventRouter.js'
import { participantsRoute } from './router/participantRouter.js'
import { categoriesRoute } from './router/categoryRoute.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/events", eventsRoute)
app.route("/participants", participantsRoute)
app.route("/categories", categoriesRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
