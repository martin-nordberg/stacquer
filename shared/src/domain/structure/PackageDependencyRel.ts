import {z} from "zod";
import {packageIdSchema} from "./Package";

/** Schema for a package dependency (uses/usedBy or dependent/precedent) relation. */
export const packageDependencyRelSchema =
    z.strictObject({
        /** The unique ID of the dependent package. */
        dependentPkgId: packageIdSchema,

        /** The unique ID of the precedent package. */
        precedentPkgId: packageIdSchema
    }).readonly()

export type PackageDependencyRel = z.infer<typeof packageDependencyRelSchema>


