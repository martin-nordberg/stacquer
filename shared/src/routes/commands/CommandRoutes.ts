import {Hono} from 'hono'
import {type IPackageCommandService} from "../../services/structure/IPackageService";
import {zxValidator} from "../validation/zxvalidator";
import {commandSchema} from "../../services/commands/Command";

export const commandRoutes = (
    packageService: IPackageCommandService
) => {

    /* TODO: just for testing
    packageService.createPackage({
        cmd: 'package-create',
        parentPackage: {
            id: rootPackageId,
            name: '$'
        },
        id: genPackageId(),
        name: "package1",
        summary: "The first package"
    })
    packageService.createPackage({
        cmd: 'package-create',
        parentPackage: {
            id: rootPackageId,
            name: '$'
        },
        id: genPackageId(),
        name: "package2"
    })
    packageService.createPackage({
        cmd: 'package-create',
        parentPackage: {
            id: rootPackageId,
            name: '$'
        },
        id: genPackageId(),
        name: "package3",
        summary: "The third package"
    })
    */

    return new Hono()
        .post(
            '/',
            zxValidator('json', commandSchema),
            async (c) => {
                const command = c.req.valid('json')
                switch (command.cmd) {
                    case 'package-create':
                        return c.json(await packageService.createPackage(command), 201)
                    case 'package-update':
                        return c.json(await packageService.updatePackage(command), 200)
                }
                // return c.json(`{"error": "Unknown cmd: '${command.cmd}'"}`, 400)
            }
        )
}

/* Unused local function defined purely for its return type, needed by Hono Client. */
const cmdRoutes = (pkgApp: ReturnType<typeof commandRoutes>) => new Hono().route('/commands', pkgApp)

export type CommandRoutes = ReturnType<typeof cmdRoutes>
