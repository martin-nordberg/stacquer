import {
    type IPackageCmdSvc,
    type PackageCreateCmd,
    type PackageDeleteCmd,
    type PackageUpdateCmd
} from "../structure/PackageCmdSvcs";
import {type ICommandSvc} from "../CommandSvcs";

/**
 * Service that delegates to sub-services by type.
 */
export class DelegatingCmdSvc implements ICommandSvc {

    constructor(
        private packageCmdSvc: IPackageCmdSvc
    ) {
    }

    async createPackage(cmd: PackageCreateCmd): Promise<void> {
        return this.packageCmdSvc.createPackage(cmd)
    }

    async deletePackage(cmd: PackageDeleteCmd): Promise<void> {
        return this.packageCmdSvc.deletePackage(cmd)
    }

    async updatePackage(cmd: PackageUpdateCmd): Promise<void> {
        return this.packageCmdSvc.updatePackage(cmd)
    }
}