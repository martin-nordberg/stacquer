import {z} from "zod";
import {packageIdSchema} from "./Package";

/** Schema for a package / subpackage relation. */
export const subPackageRelationSchema =
    z.strictObject({
        /** The unique ID of the linked package. */
        parentId: packageIdSchema,

        /** The name of the linked package. */
        childId: packageIdSchema
    }).readonly()

export type SubPackageRelation = z.infer<typeof subPackageRelationSchema>


