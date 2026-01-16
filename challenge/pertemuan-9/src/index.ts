import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authRoute } from './modules/auth/route.js'
import "dotenv/config"
import { productRoute } from './modules/products/route.js'
import { reviewsRoute } from './modules/reviews/route.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/auth", authRoute)
app.route("/products", productRoute)
app.route("/reviews", reviewsRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
