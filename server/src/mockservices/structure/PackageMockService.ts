import {type IPackageCmdSvc} from "$shared/commandservices/structure/PackageCmdSvcs";
import {
    type Package,
    type PackageGraph,
    type PackageId,
    packageSchema,
    rootPackageId
} from "$shared/domain/structure/Package";
import {checkNonNull} from "$shared/util/Assertions";
import {HTTPException} from "hono/http-exception";
import {type IPackageQrySvc} from "$shared/queryservices/structure/IPackageQrySvc";
import {
    type PackageCreateCmd,
    type PackageDeleteCmd,
    type PackageUpdateCmd
} from "$shared/commandservices/structure/PackageCmdSvcs";


export class PackageMockService implements IPackageQrySvc, IPackageCmdSvc {

    readonly #packagesById = new Map<PackageId, Package>()

    readonly #parentPackagesByChildId = new Map<PackageId, PackageId>()

    readonly #rootPackage: Package = packageSchema.parse({
        id: rootPackageId,
        name: '$',
        summary: "The root package.",
        description: "This is the predefined topmost package.",
    })

    readonly #subPackagesByParentId = new Map<PackageId, PackageId[]>()

    constructor() {
        this.#packagesById.set(rootPackageId, this.#rootPackage)
        this.#subPackagesByParentId.set(rootPackageId, [])
    }

    async createPackage(cmd: PackageCreateCmd): Promise<void> {
        const pkg = cmd.payload
        const parentPackageId = pkg.parentPackageId

        const childPkgIds = this.#subPackagesByParentId.get(parentPackageId) ?? null
        checkNonNull(childPkgIds, () => `Parent package ID '${parentPackageId}' not found while creating package ${pkg.name}.`)
        childPkgIds.push(pkg.id)

        const result = {
            id: pkg.id,
            name: pkg.name,
            summary: pkg.summary,
            description: pkg.description,
        }

        this.#packagesById.set(pkg.id, result)
        this.#parentPackagesByChildId.set(pkg.id, parentPackageId)
        this.#subPackagesByParentId.set(parentPackageId, childPkgIds)
        this.#subPackagesByParentId.set(pkg.id, [])
    }

    async deletePackage(cmd: PackageDeleteCmd): Promise<void> {
        const packageId = cmd.payload
        const childPkgIds = this.#subPackagesByParentId.get(packageId)
        checkNonNull(childPkgIds, () => `Package not found for deletion: '${packageId}.`)
        for (const pkgId of childPkgIds) {
            await this.deletePackage({...cmd, payload: pkgId})
        }
        this.#packagesById.delete(packageId)
        this.#parentPackagesByChildId.delete(packageId)
        this.#subPackagesByParentId.delete(packageId)
    }

    async findPackageById(packageId: PackageId): Promise<Package | null> {
        return this.#packagesById.get(packageId) ?? null
    }

    async findPackageGraphById(packageId: PackageId): Promise<PackageGraph | null> {
        const pkg = await this.findPackageById(packageId)

        if (pkg == null) {
            return null
        }

        const parentPackages = await this.findParentPackages(packageId)
        const subPackages = await this.findSubPackages(packageId)

        return {
            ...pkg,
            parentPackages,
            subPackages
        }
    }

    async findParentPackages(childPackageId: PackageId): Promise<Package[]> {
        if (childPackageId === rootPackageId) {
            return []
        }

        const parentPackageId = this.#parentPackagesByChildId.get(childPackageId)
        checkNonNull(parentPackageId, () => `Package not found: '${childPackageId}.`)
        const parentPkgAttributes = this.#packagesById.get(parentPackageId)
        checkNonNull(parentPkgAttributes, () => `Parent package not found '${parentPackageId}.`)
        return [
            parentPkgAttributes,
            ...(await this.findParentPackages(parentPackageId))
        ]
    }

    async findRootPackageGraph(): Promise<PackageGraph> {
        return (await this.findPackageGraphById(rootPackageId))!
    }

    async findSubPackages(parentPackageId: PackageId): Promise<Package[]> {
        const childPkgIds = this.#subPackagesByParentId.get(parentPackageId)
        checkNonNull(childPkgIds, () => `Package not found: '${parentPackageId}.`)
        const result: Package[] = []
        for (let pkgId of childPkgIds) {
            result.push((await this.findPackageById(pkgId))!)
        }
        result.sort((p1, p2) => p1.name.localeCompare(p2.name) || p1.id.localeCompare(p2.id))
        return result
    }

    async updatePackage(cmd: PackageUpdateCmd): Promise<void> {
        const packageUpdate = cmd.payload
        const pkg = await this.findPackageById(packageUpdate.id)

        if (pkg == null) {
            throw new HTTPException(404)
        }

        const revisedPkg: Package = {
            ...pkg,
            name: packageUpdate.name ?? pkg.name,
            summary: packageUpdate.summary ?? pkg.summary,
            description: packageUpdate.description ?? pkg.description,
        }

        this.#packagesById.set(revisedPkg.id, revisedPkg)
    }
}