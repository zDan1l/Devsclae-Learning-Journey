import { Hono } from 'hono'

const app = new Hono()

const products = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' },
]

app.get('/products', (c) => {
  return c.json({ products: [] })
})

app.get('/products/:productId', (c)=> {
  const productId = c.req.param('productId')
  return c.json({ productId })
})

app.post('/products', (c) => {
  return c.json({ message: 'Product created' }, 201)
})

app.patch('/products/:productId', (c) => {
  const productId = c.req.param('productId')
  return c.json({ message: `Product ${productId} updated` })
})

app.delete('/products/:productId', (c) => {
  const productId = c.req.param('productId')
  return c.json({ message: `Product ${productId} deleted` })
})

export default app
