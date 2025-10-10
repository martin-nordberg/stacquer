import {z} from "zod";

/** Schema for a Stacquer name. */
export const nameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/

export const nameSchema =
    z.string()
        .trim()
        .min(1, "Name must not be empty.")
        .max(200, "Name can be at most 200 characters.")
        .regex(nameRegex, "Name must start with a letter, underscore or '$' followed by letters, numbers, underscores, and '$'.")

export type NameStr = z.infer<typeof nameSchema>
