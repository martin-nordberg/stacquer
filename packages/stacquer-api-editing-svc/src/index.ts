import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('This is the Stacquer API editing service.')
})

export default {
  port: 3111,
  fetch: app.fetch,
}
