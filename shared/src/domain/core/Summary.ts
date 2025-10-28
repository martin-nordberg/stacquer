import {z} from "zod";

export const summaryMaxLength = 200;

/** Zod schema for summary validation. */
export const summarySchema = z.string()
    .trim()
    .min(1, "Summary must not be empty if present.")
    .max(summaryMaxLength, `Summary can be at most ${summaryMaxLength} characters.`)
    .regex(/^[^\r\n]*$/, "Summary must not cross multiple lines.")

export type SummaryStr = z.infer<typeof summarySchema>


