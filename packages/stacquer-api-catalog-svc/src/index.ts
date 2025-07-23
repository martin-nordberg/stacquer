import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('This is the API catalog service.')
})

export default {
  port: 3110,
  fetch: app.fetch,
}
