import {z} from "zod";
import {
    dispatchPackageCmd,
    type IPackageCmdSvc,
    type PackageCmd,
    packageCmdSchema
} from "./PackageCmdSvcs";
import {fail} from "../../util/Assertions";


export const structureCmdSchema = z.discriminatedUnion('cmdType', [
    ...packageCmdSchema.options
])

export type StructureCmd = z.infer<typeof structureCmdSchema>

export const dispatchStructureCmd = (command: StructureCmd, service: IStructureCmdSvc) => {
    if (command.cmdType.startsWith('structure/package/')) {
        return dispatchPackageCmd(command as PackageCmd, service)
    } else {
        fail(`Unknown structure command type: ${command.cmdType}`)
    }
}


export type IStructureCmdSvc = IPackageCmdSvc
