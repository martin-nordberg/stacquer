import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('This is the Stacquer schema editing service.')
})

export default {
  port: 3101,
  fetch: app.fetch,
}
