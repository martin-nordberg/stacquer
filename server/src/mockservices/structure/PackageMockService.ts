import type {
    IPackageCommandService,
    IPackageQueryService
} from "$shared/services/structure/IPackageService.ts";
import {
    type Package, type PackageCreationCmd,
    type PackageId,
    packageOverviewSchema,
    packageSchema, type PackageUpdateCmd,
    rootPackageId
} from "$shared/domain/structure/Package.ts";
import {checkNonNull} from "$shared/util/Assertions.ts";
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

    async createPackage(packageJson: PackageCreationCmd): Promise<Package> {
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

    async updatePackage(packageJson: PackageUpdateCmd): Promise<Package> {
        const pkg = await this.findPackageById(packageJson.id)

        if (pkg == null) {
            throw new HTTPException(404)
        }

        // TODO: make the update

        return pkg
    }
}