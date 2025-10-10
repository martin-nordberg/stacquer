import {type Package, type PackageCreationCmd, type PackageId, type PackageUpdateCmd} from "../../domain/structure/Package";


export interface IPackageQueryService {

    /** Finds the package with given unique ID */
    findPackageById(packageId: PackageId) : Promise<Package | null>

    /** Finds the top level root package. */
    findRootPackage() : Promise<Package>

}


export interface IPackageCommandService {

    /** Creates a new package. */
    createPackage(packageJson: PackageCreationCmd): Promise<Package>

    /** Updates a package's attributes. */
    updatePackage(packageJson: PackageUpdateCmd): Promise<Package>

}