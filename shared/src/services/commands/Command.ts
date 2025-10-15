import {z} from "zod";
import {packageCreationSchema, packageUpdateSchema} from "../../domain/structure/Package";


export const commandSchema = z.discriminatedUnion(
    "cmd",
    [
        packageCreationSchema,
        packageUpdateSchema
    ]
)

export type Command = z.infer<typeof commandSchema>