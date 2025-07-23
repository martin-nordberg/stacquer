import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('This is the Stacquer schema catalog service.')
})

export default {
  port: 3100,
  fetch: app.fetch,
}
