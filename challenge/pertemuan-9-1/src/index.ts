import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authRoute } from './modules/auth/authRoute.js'
import { productsRoute } from './modules/products/route.js'
import "dotenv/config"
 
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/auth", authRoute)
app.route("/products", productsRoute)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
