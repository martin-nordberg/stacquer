import { Hono } from 'hono'
import organizationsRoute from "./routes/organizationsRoute.ts";

const app = new Hono()

app.get('/', (c) => {
  return c.text('This is the Stacquer organization editing service.')
})

app.route('/organizations', organizationsRoute)

export default {
  port: 3120,
  fetch: app.fetch,
}
