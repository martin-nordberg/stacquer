import {z} from "zod";
import {
    dispatchStructureCmd,
    type IStructureCmdSvc,
    type StructureCmd,
    structureCmdSchema
} from "./structure/StructureCmdSvcs";
import {fail} from "../util/Assertions";


export const commandSchema = z.discriminatedUnion('cmdType', [
    ...structureCmdSchema.options
])

export type Command = z.infer<typeof commandSchema>


export const dispatchCmd =
    (command: Command, service: ICommandSvc, chain: (cmd: Command) => void) => {
    chain(command)

    if (command.cmdType.startsWith('structure/')) {
        return dispatchStructureCmd(command as StructureCmd, service)
    } else {
        fail(`Unknown command type: ${command.cmdType}`)
    }
}


export type ICommandSvc = IStructureCmdSvc
