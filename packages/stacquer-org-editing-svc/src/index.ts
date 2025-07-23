import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('This is the Stacquer organization editing service.')
})

export default {
  port: 3120,
  fetch: app.fetch,
}
