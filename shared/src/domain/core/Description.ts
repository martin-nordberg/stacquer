import {z} from "zod";

/** Zod schema for description validation. */
export const descriptionSchema = z.string()
    .trim()
    .min(1, "Description must not be empty if present.")

export type DescriptionStr = z.infer<typeof descriptionSchema>


