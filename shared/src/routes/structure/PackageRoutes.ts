import {Hono} from 'hono'
import {type IPackageQueryService} from "../../services/structure/IPackageService";
import {packageIdSchema} from "../../domain/structure/Package";
import {zxValidator} from "../validation/zxvalidator";
import {z} from "zod";

export const packageRoutes= (packageService: IPackageQueryService) => {
    return new Hono()
        .get(
            '/',
            async (c) => {
                return c.json(await packageService.findRootPackage())
            }
        )
        .get(
            '/:id',
            zxValidator('param', z.object({id:packageIdSchema})),
            async (c) => {
                const { id } = c.req.valid('param');
                return c.json(await packageService.findPackageById(id))
            }
        )
}

export type PackageRoutes = ReturnType<typeof packageRoutes>
