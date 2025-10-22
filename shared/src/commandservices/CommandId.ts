import {z} from "zod";
import {createId} from "@paralleldrive/cuid2";


/** Schema for a command ID. */
export const commandIdPrefix = 'cmnd'
export const commandIdSchema =
    z.cuid2({message: `Command ID must be a string in CUID2 format with prefix '${commandIdPrefix}'.`})
        .trim()
        .startsWith(commandIdPrefix)
        .brand('Command')
export type CommandId = z.infer<typeof commandIdSchema>


/** Generates a new ID for a command. */
export const genCommandId: () => CommandId =
    () => commandIdSchema.parse(commandIdPrefix + createId())


