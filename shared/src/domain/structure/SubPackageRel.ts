import {z} from "zod";
import {packageIdSchema} from "./Package";

/** Schema for a package / sub-package relation. */
export const subPackageRelSchema =
    z.strictObject({
        /** The unique ID of the parent package. */
        parentId: packageIdSchema,

        /** The unique ID of the child sub-package. */
        childId: packageIdSchema
    }).readonly()

export type SubPackageRel = z.infer<typeof subPackageRelSchema>


