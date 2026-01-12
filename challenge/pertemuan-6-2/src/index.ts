import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { categoriesRoutes } from './router/categoriesRoute.js'
import { postsRoutes } from './router/postsRoute.js'
import { usersRoutes } from './router/usersRoute.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route("/categories", categoriesRoutes)
app.route("/posts", postsRoutes)
app.route("/users", usersRoutes)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
