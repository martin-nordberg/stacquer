import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors({
  origin: ['http://localhost:5173', 'http://10.0.0.3:5173']
}));

app.get('/', (c) => {
  return c.text('This is the Stacquer Studio web application.')
})

app.get('/about', (c) => {
  return c.json({
    name: 'Stacquer Studio',
    version: 0.1
  })
})

app.get('/organizations', async (c) => {
    const response = await fetch('http://localhost:3120/organizations')
    if (!response.ok) {
        return c.json({ error: `Failed to fetch data: ${response.statusText}` , status: response.status});
    }
    return c.json(await response.json())
})

export default app
