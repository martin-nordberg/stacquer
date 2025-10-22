import {
    type PackageCreateCmd,
    type PackageDeleteCmd,
    type PackageUpdateCmd
} from "../structure/PackageCmdSvcs";
import {type ICommandSvc} from "../CommandSvcs";

/**
 * Service that sends its commands to asynchronous and synchronous inner services.
 */
export class AsyncTeeCmdSvc implements ICommandSvc {

    constructor(
        private readonly asyncServices: ICommandSvc[],
        private readonly syncServices: ICommandSvc[],
    ) {
    }

    async createPackage(cmd: PackageCreateCmd): Promise<void> {
        this.asyncServices.forEach(s => s.createPackage(cmd))
        this.syncServices.forEach(async (s) => await s.createPackage(cmd))
    }

    async deletePackage(cmd: PackageDeleteCmd): Promise<void> {
        this.asyncServices.forEach(s => s.deletePackage(cmd))
        this.syncServices.forEach(async (s) => await s.deletePackage(cmd))
    }

    async updatePackage(cmd: PackageUpdateCmd): Promise<void> {
        this.asyncServices.forEach(s => s.updatePackage(cmd))
        this.syncServices.forEach(async (s) => await s.updatePackage(cmd))
    }

}