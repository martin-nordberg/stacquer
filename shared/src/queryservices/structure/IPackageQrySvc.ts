import {
    type Package,
    type PackageGraph,
    type PackageId,
} from "../../domain/structure/Package";


export interface IPackageQrySvc {

    /** Finds the package with given unique ID */
    findPackageById(packageId: PackageId): Promise<Package | null>

    /** Finds the package with given unique ID. Also populates parent & child packages. */
    findPackageGraphById(packageId: PackageId): Promise<PackageGraph | null>

    /** Finds the sequence of parents of a given package, empty for the root package. */
    findParentPackages(childPackageId: PackageId): Promise<Package[]>

    /** Finds the top level root package. */
    findRootPackageGraph(): Promise<PackageGraph>

    /** Finds the related sub packages of a given package (empty array if none). */
    findSubPackages(parentPackageId: PackageId): Promise<Package[]>

}

