import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {packageRoutes} from "$shared/routes/structure/PackageRoutes";
import {PackageMockService} from "./mockservices/structure/PackageMockService";
import {packageCmdRoutes} from "$shared/routes/structure/PackageCmdRoutes";

const app = new Hono()

app.use('*', cors({
    origin: ['http://localhost:3000', 'http://10.0.0.3:3000']
}));

const packageService = new PackageMockService();

const routes =
    app.route('/commands/packages', packageCmdRoutes(packageService))
       .route('/queries/packages', packageRoutes(packageService))

.get('/', (c) => {
    return c.text('This is the Stacquer Studio web application.')
})

.get('/about', (c) => {
    return c.json({
        name: 'Stacquer Studio',
        version: 0.1
    })
})

export type AppType = typeof routes

export default {
    port: 3001,
    fetch: app.fetch,
}