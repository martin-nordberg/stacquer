import {Hono} from 'hono'
import {packageIdSchema} from "../../domain/structure/Package";
import {zxValidator} from "../validation/zxvalidator";
import {z} from "zod";
import {type IPackageQrySvc} from "../../queryservices/structure/IPackageQrySvc";

export const packageQryRoutes = (packageService: IPackageQrySvc) => {
    return new Hono()
        .get(
            '/',
            async (c) => {
                return c.json(await packageService.findRootPackageGraph())
            }
        )
        .get(
            '/:id',
            zxValidator('param', z.object({id: packageIdSchema})),
            async (c) => {
                const {id} = c.req.valid('param');
                return c.json(await packageService.findPackageById(id))
            }
        )
        .get(
            '/:id/graph',
            zxValidator('param', z.object({id: packageIdSchema})),
            async (c) => {
                const {id} = c.req.valid('param');
                return c.json(await packageService.findPackageGraphById(id))
            }
        )
        .get(
            '/:id/parentpackages',
            zxValidator('param', z.object({id: packageIdSchema})),
            async (c) => {
                const {id} = c.req.valid('param');
                return c.json(await packageService.findParentPackages(id))
            }
        )
        .get(
            '/:id/subpackages',
            zxValidator('param', z.object({id: packageIdSchema})),
            async (c) => {
                const {id} = c.req.valid('param');
                return c.json(await packageService.findSubPackages(id))
            }
        )
}

/* Unused local function defined purely for its return type, needed by Hono Client. */
const pkgQryRoutes = (pkgApp: ReturnType<typeof packageQryRoutes>) => new Hono().route('/packages', pkgApp)

export type PackageQueryRoutes = ReturnType<typeof pkgQryRoutes>


