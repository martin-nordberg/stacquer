import {type Package, type PackageCreation, type PackageId, type PackageUpdate} from "../../domain/structure/Package";


export interface IPackageQueryService {

    /** Finds the package with given unique ID */
    findPackageById(packageId: PackageId) : Promise<Package | null>

    /** Finds the top level root package. */
    findRootPackage() : Promise<Package>

}


export interface IPackageCommandService {

    /** Creates a new package. */
    createPackage(packageJson: PackageCreation): Promise<Package>

    /** Updates a package's attributes. */
    updatePackage(packageJson: PackageUpdate): Promise<Package>

}