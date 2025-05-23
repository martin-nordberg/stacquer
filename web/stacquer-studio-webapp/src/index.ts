import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {organizationRoutes} from "./routes/organizationRoutes.js";

export const app = new Hono()

const junk: number = 234

app.get('/', (c) => {
    return c.text('Hello Hono World!')
})

app.route('/organizations', organizationRoutes)

serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})
