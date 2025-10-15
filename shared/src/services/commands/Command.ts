import {z} from "zod";
import {packageCreationCmdSchema, packageUpdateCmdSchema} from "../../domain/structure/Package";


export const commandSchema = z.discriminatedUnion(
    "cmd",
    [
        packageCreationCmdSchema,
        packageUpdateCmdSchema
    ]
)

export type Command = z.infer<typeof commandSchema>