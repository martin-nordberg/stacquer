import {Hono} from 'hono'
import {type IPackageCommandService} from "../../services/structure/IPackageService";
import {zxValidator} from "../validation/zxvalidator";
import {packageCreationSchema, packageUpdateSchema} from "../../domain/structure/Package";

export const packageCmdRoutes = (
    packageService: IPackageCommandService
) => {

    return new Hono()
        .post(
            '/',
            zxValidator('json', packageCreationSchema),
            async (c) => {
                const command = c.req.valid('json')
                return c.json(await packageService.createPackage(command), 201)
            }
        )
        .patch(
            '/',
            zxValidator('json', packageUpdateSchema),
            async (c) => {
                const command = c.req.valid('json')
                return c.json(await packageService.updatePackage(command), 200)
            }
        )
}

/* Unused local function defined purely for its return type, needed by Hono Client. */
const pkgCmdRoutes = (pkgApp: ReturnType<typeof packageCmdRoutes>) => new Hono().route('/packages', pkgApp)

export type PackageCmdRoutes = ReturnType<typeof pkgCmdRoutes>
