import {z} from "zod";

/** Zod schema for summary validation. */
export const summarySchema = z.string()
    .trim()
    .min(1, "Summary must not be empty if present.")
    .max(200, "Summary can be at most 200 characters.")
    .regex(/^[^\r\n]*$/, "Summary must not cross multiple lines.")

export type SummaryStr = z.infer<typeof summarySchema>


