
import { hc } from 'hono/client'
import {type PackageRoutes} from "$shared/routes/structure/PackageRoutes";
import type {IPackageCommandService, IPackageQueryService} from "$shared/services/structure/IPackageService";
import type {Package, PackageCreation, PackageId, PackageUpdate} from "$shared/domain/structure/Package";
import {HTTPException} from "hono/http-exception";
import type {PackageCmdRoutes} from "$shared/routes/structure/PackageCmdRoutes.ts";

const cmdClient = hc<PackageCmdRoutes>('http://10.0.0.3:3001/commands')

const qryClient = hc<PackageRoutes>('http://10.0.0.3:3001/queries')

export class PackageClientService implements IPackageQueryService, IPackageCommandService {

    async createPackage(packageJson: PackageCreation): Promise<Package> {
        console.log("createPackage", packageJson)
        const res = await cmdClient.packages.$post({json: packageJson})

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        throw new HTTPException(404)
    }

    async findPackageById(packageId: PackageId): Promise<Package | null> {
        console.log("findPackageById", packageId)
        const res = await qryClient.packages[':id'].$get({param: {id: packageId}})

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        return null
    }

    async findRootPackage(): Promise<Package> {
        console.log("findRootPackage")
        const res = await qryClient.packages.$get()

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        throw new HTTPException(404)
    }

    async updatePackage(packageJson: PackageUpdate): Promise<Package> {
        console.log("updatePackage", packageJson)
        const res = await cmdClient.packages.$patch({json: packageJson})

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        throw new HTTPException(404)
    }

}

export const packageClientService = new PackageClientService()