import {
    type PackageCreation, packageCreationSchema,
    type PackageId, packageIdSchema,
    type PackageUpdate, packageUpdateSchema,
} from "../../domain/structure/Package";
import {z} from "zod";
import {commandIdSchema, genCommandId} from "../CommandId";
import {fail} from "../../util/Assertions";


/** Package Creation */
export const packageCreateCmdSchema = z.strictObject({
    cmdType: z.literal('structure/package/create'),
    cmdId: commandIdSchema,
    createdAt: z.iso.datetime(),
    origin: z.string(),
    payload: packageCreationSchema,
})

export type PackageCreateCmd = z.infer<typeof packageCreateCmdSchema>

const dispatchPackageCreateCmd = (cmd: PackageCreateCmd, service: IPackageCmdSvc) => {
    return service.createPackage(cmd)
}

export const buildPackageCreateCmd = (pkg: PackageCreation, origin: string): PackageCreateCmd => {
    return {
        cmdType: 'structure/package/create',
        cmdId: genCommandId(),
        origin,
        createdAt: new Date().toISOString(),
        payload: pkg,
    }
}


/** Package Update */
export const packageUpdateCmdSchema = z.strictObject({
    cmdType: z.literal('structure/package/update'),
    cmdId: commandIdSchema,
    createdAt: z.iso.datetime(),
    origin: z.string(),
    payload: packageUpdateSchema,
})

export type PackageUpdateCmd = z.infer<typeof packageUpdateCmdSchema>

const dispatchPackageUpdateCmd = (cmd: PackageUpdateCmd, service: IPackageCmdSvc) => {
    return service.updatePackage(cmd)
}

export const buildPackageUpdateCmd = (packageUpdate: PackageUpdate, origin: string): PackageUpdateCmd => {
    return {
        cmdType: 'structure/package/update',
        cmdId: genCommandId(),
        origin,
        createdAt: new Date().toISOString(),
        payload: packageUpdate,
    }
}


/** Package Deletion */
export const packageDeleteCmdSchema = z.strictObject({
    cmdType: z.literal('structure/package/delete'),
    cmdId: commandIdSchema,
    createdAt: z.iso.datetime(),
    origin: z.string(),
    payload: packageIdSchema,
})

export type PackageDeleteCmd = z.infer<typeof packageDeleteCmdSchema>

const dispatchPackageDeleteCmd = (cmd: PackageDeleteCmd, service: IPackageCmdSvc) => {
    return service.deletePackage(cmd)
}

export const buildPackageDeleteCmd = (packageId: PackageId, origin: string): PackageDeleteCmd => {
    return {
        cmdType: 'structure/package/delete',
        cmdId: genCommandId(),
        origin,
        createdAt: new Date().toISOString(),
        payload: packageId,
    }
}


/**
 * Discriminated union of all package command types.
 */
export const packageCmdSchema = z.discriminatedUnion('cmdType', [
    packageCreateCmdSchema,
    packageUpdateCmdSchema,
    packageDeleteCmdSchema,
])

export type PackageCmd = z.infer<typeof packageCmdSchema>

export const dispatchPackageCmd = (command: PackageCmd, service: IPackageCmdSvc) => {
    if (command.cmdType === 'structure/package/create') {
        return dispatchPackageCreateCmd(command as PackageCreateCmd, service)
    } else if (command.cmdType === 'structure/package/update') {
        return dispatchPackageUpdateCmd(command as PackageUpdateCmd, service)
    } else if (command.cmdType === 'structure/package/delete') {
        return dispatchPackageDeleteCmd(command as PackageDeleteCmd, service)
    } else {
        fail(`Unknown package command type.`)
    }
}


/**
 * Interface to command services for packages.
 */
export interface IPackageCmdSvc {

    /** Creates a new package with given attributes contained by given parent package. */
    createPackage(cmd: PackageCreateCmd): Promise<void>

    /** Deletes a given package. */
    deletePackage(cmd: PackageDeleteCmd): Promise<void>

    /** Updates a package's attributes. */
    updatePackage(cmd: PackageUpdateCmd): Promise<void>

}

