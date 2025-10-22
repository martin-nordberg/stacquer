import {hc} from 'hono/client'
import {type PackageQueryRoutes} from "$shared/routes/structure/PackageQryRoutes.ts";
import type {
    IPackageCmdSvc,
    PackageCreateCmd, PackageDeleteCmd, PackageUpdateCmd
} from "$shared/commandservices/structure/PackageCmdSvcs.ts";
import type {Package, PackageGraph, PackageId} from "$shared/domain/structure/Package";
import {HTTPException} from "hono/http-exception";
import type {CommandRoutes} from "$shared/routes/commands/CommandRoutes.ts";
import type {IPackageQrySvc} from "$shared/queryservices/structure/IPackageQrySvc.ts";

const cmdClient = hc<CommandRoutes>('http://10.0.0.3:3001/commands')

const qryClient = hc<PackageQueryRoutes>('http://10.0.0.3:3001/queries')

export class PackageClientService implements IPackageQrySvc, IPackageCmdSvc {

    async createPackage(cmd: PackageCreateCmd): Promise<void> {
        console.log("createPackage", cmd)
        const res = await cmdClient.index.$post({json: cmd})

        if (res.ok) {
            return
        }

        console.log(res)

        throw new HTTPException(404)
    }

    async deletePackage(cmd: PackageDeleteCmd): Promise<void> {
        console.log("deletePackage", cmd)
        const res = await cmdClient.index.$post({json: cmd})

        if (res.ok) {
            return
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

    async findPackageGraphById(packageId: PackageId): Promise<PackageGraph | null> {
        console.log("findPackageGraphById", packageId)
        const res = await qryClient.packages[':id'].graph.$get({param: {id: packageId}})

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        return null
    }

    async findParentPackages(childPackageId: PackageId): Promise<Package[]> {
        console.log("findParentPackages", childPackageId)
        const res = await qryClient.packages[':id'].parentpackages.$get({param: {id: childPackageId}})

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        return []
    }

    async findRootPackageGraph(): Promise<PackageGraph> {
        console.log("findRootPackage")
        const res = await qryClient.packages.$get()

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        throw new HTTPException(404)
    }

    async findSubPackages(parentPackageId: PackageId): Promise<Package[]> {
        console.log("findSubPackages", parentPackageId)
        const res = await qryClient.packages[':id'].subpackages.$get({param: {id: parentPackageId}})

        if (res.ok) {
            return res.json()
        }

        console.log(res)

        return []
    }

    async updatePackage(cmd: PackageUpdateCmd): Promise<void> {
        console.log("updatePackage", cmd)
        const res = await cmdClient.index.$post({json: cmd})

        if (res.ok) {
            return
        }

        console.log(res)

        throw new HTTPException(404)
    }

}

export const packageClientService = new PackageClientService()