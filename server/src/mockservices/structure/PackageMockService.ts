import type {
    IPackageCommandService,
    IPackageQueryService
} from "$shared/services/structure/IPackageService";
import {
    type Package,
    type PackageCreation,
    type PackageId,
    packageOverviewSchema,
    packageSchema,
    type PackageUpdate,
    rootPackageId
} from "$shared/domain/structure/Package";
import {checkNonNull} from "$shared/util/Assertions";
import {HTTPException} from "hono/http-exception";


let rootPackage = packageSchema.parse(
    {
        id: rootPackageId,
        parentPackage: {
            id: rootPackageId,
            name: "$"
        },
        name: '$',
        summary: "The root package.",
        description: "A description can carry over\nmultiple lines.",
        subPackages: []
    }
)

let packagesById = new Map<PackageId, Package>()
packagesById.set(rootPackageId, rootPackage)

export class PackageMockService implements IPackageQueryService, IPackageCommandService {

    async createPackage(packageJson: PackageCreation): Promise<Package> {
        const result: Package = {
            ...packageJson,
            subPackages: []
        }

        const parent = await this.findPackageById(result.parentPackage.id)
        checkNonNull(parent, () => `Parent package '${result.parentPackage.id}' not found.`)

        parent.subPackages.push(packageOverviewSchema.parse({
            id: result.id,
            name: result.name,
            summary: result.summary,
        }))
        packagesById.set(result.id, result)

        return result
    }

    async findPackageById(packageId: PackageId): Promise<Package | null> {
        return packagesById.get(packageId) ?? null
    }

    async findRootPackage(): Promise<Package> {
        return rootPackage
    }

    async updatePackage(packageJson: PackageUpdate): Promise<Package> {
        const pkg = await this.findPackageById(packageJson.id)

        if (pkg == null) {
            throw new HTTPException(404)
        }

        const revisedPkg: Package = {
            ...pkg,
            name: packageJson.name ?? pkg.name,
            summary: packageJson.summary ?? pkg.summary,
            description: packageJson.description ?? pkg.summary,
        }

        packagesById.set(revisedPkg.id, revisedPkg)

        return revisedPkg
    }
}