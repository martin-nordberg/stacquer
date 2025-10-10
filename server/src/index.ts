import {Hono} from 'hono'
import {cors} from 'hono/cors'
import type {Branded} from "$shared/util/Branded.ts";
import {packageRoutes} from "$shared/routes/structure/PackageRoutes.ts";
import {PackageMockService} from "./mockservices/structure/PackageMockService.ts";
import {commandRoutes} from "$shared/routes/commands/CommandRoutes.ts";

const app = new Hono()

app.use('*', cors({
    origin: ['http://localhost:3000', 'http://10.0.0.3:3000']
}));

app.route('/commands', commandRoutes(new PackageMockService()))
app.route('/queries/packages', packageRoutes(new PackageMockService()))

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
    const x: Branded<string, 'whatever'> = "asdgfasdfasdf" as Branded<string, 'whatever'>
    console.log("x = ", x)

    const mockOrgs = [
        {
            id: 'abc123',
            name: "Abc"
        },
        {
            id: 'def123',
            name: "Def"
        },
        {
            id: 'pqr123',
            name: "Pqr"
        },
        {
            id: 'stu123',
            name: "Stu"
        },
        {
            id: 'xyz123',
            name: "Xyz"
        },
        {
            id: 'lmn123',
            name: "Lmn"
        },
    ]

    return c.json(mockOrgs)
})

export default {
    port: 3001,
    fetch: app.fetch,
}