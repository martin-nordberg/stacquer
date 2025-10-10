
import { hc } from 'hono/client'
import {type PackageRoutes} from "$shared/routes/structure/PackageRoutes";
import type {IPackageCommandService, IPackageQueryService} from "$shared/services/structure/IPackageService";
import type {Package, PackageCreationCmd, PackageId, PackageUpdateCmd} from "$shared/domain/structure/Package";
import {HTTPException} from "hono/http-exception";
import type {CommandRoutes} from "$shared/routes/commands/CommandRoutes";

const cmdClient = hc<CommandRoutes>('http://10.0.0.3:3001/commands')

const qryClient = hc<PackageRoutes>('http://10.0.0.3:3001/queries/packages')

export class PackageClientService implements IPackageQueryService, IPackageCommandService {

    async createPackage(packageJson: PackageCreationCmd): Promise<Package> {
        const res = await cmdClient.index.$post({json: packageJson})

        if (res.ok) {
            return res.json()
        }

        throw new HTTPException(404)
    }

    async findPackageById(packageId: PackageId): Promise<Package | null> {
        const res = await  qryClient.index.$get(packageId)

        if (res.ok) {
            return res.json()
        }

        return null
    }

    async findRootPackage(): Promise<Package> {
        const res = await qryClient.index.$get()

        if (res.ok) {
            return res.json()
        }

        throw new HTTPException(404)
    }

    async updatePackage(packageJson: PackageUpdateCmd): Promise<Package> {
        const res = await cmdClient.index.$post({json: packageJson})

        if (res.ok) {
            return res.json()
        }

        throw new HTTPException(404)
    }

}

export const packageClientService = new PackageClientService()