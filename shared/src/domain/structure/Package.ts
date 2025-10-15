import {z} from "zod";
import {nameSchema} from "../core/Name";
import {summarySchema} from "../core/Summary";
import {createId} from "@paralleldrive/cuid2";
import {descriptionSchema} from "../core/Description";

/** Schema for a package ID. */
export const packageIdPrefix = 'pckg'
export const packageIdSchema =
    z.cuid2({message: `Package ID must be a string in CUID2 format with prefix '${packageIdPrefix}'.`})
        .trim()
        .startsWith(packageIdPrefix)
        .brand('Package')
export type PackageId = z.infer<typeof packageIdSchema>


/** The global root (unnamed) package unique ID. */
export const rootPackageId =
    packageIdSchema.parse(`${packageIdPrefix}thestacquerrootpackageid`)


/** Generates a new ID for a package. */
export const genPackageId: () => PackageId =
    () => packageIdSchema.parse(packageIdPrefix + createId())


/** Schema for a brief overview of a package. */
export const packageOverviewSchema =
    z.strictObject({
        /** The unique ID of the linked package. */
        id: packageIdSchema,

        /** The name of the linked package. */
        name: nameSchema,

        /* A short summary of the package. */
        summary: summarySchema.optional(),
    })
export type PackageOverview = z.infer<typeof packageOverviewSchema>


/** Schema for a Stacquer package's details. */
export const packageDetailsSchema =
    z.strictObject({
        ...packageOverviewSchema.shape,

        /* A longer description of the package. */
        description: descriptionSchema.optional(),

        /** The unique ID of this package's parent package. */
        parentPackage: packageOverviewSchema,

        /* The unique IDs of child packages within this package. */
        subPackages: z.array(packageOverviewSchema)
    })

export type PackageDetails = z.infer<typeof packageDetailsSchema>


/** Schema for a package. */
export const packageSchema = packageDetailsSchema.readonly()

export type Package = z.infer<typeof packageSchema>


/** Sub-schema for package creation. */
export const packageCreationCmdSchema =
    z.strictObject({
        cmd: z.literal('package-create'),
        ...packageDetailsSchema.omit({
            subPackages: true,
        }).shape
    }).readonly()

export type PackageCreationCmd = z.infer<typeof packageCreationCmdSchema>


/** Sub-schema for package updates. */
export const packageUpdateCmdSchema =
    z.strictObject({
        cmd: z.literal('package-update'),
        ...packageDetailsSchema.omit({
            parentPackage: true,
            subPackages: true,
        }).shape
    }).readonly()

export type PackageUpdateCmd = z.infer<typeof packageUpdateCmdSchema>
