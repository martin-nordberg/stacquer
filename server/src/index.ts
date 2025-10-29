import {Hono} from 'hono'
import {cors} from 'hono/cors'
import {packageQryRoutes} from "$shared/routes/structure/PackageQryRoutes";
import {commandRoutes} from "$shared/routes/commands/CommandRoutes";
import {PackageSqlService} from "./sqlservices/structure/PackageSqlService";
import {writeCommandToYaml} from "./yamlservices/YamlCommandWriter";
import {readYamlToCommands} from "./yamlservices/YamlCommandReader";

const app = new Hono()

app.use('*', cors({
    origin: ['http://localhost:3000', 'http://10.0.0.3:3000']
}));

const packageService = new PackageSqlService();
await readYamlToCommands(packageService, (_) => {})

const routes =
    app.route('/commands', commandRoutes(packageService, writeCommandToYaml))
        .route('/queries/packages', packageQryRoutes(packageService))

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