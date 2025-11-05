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


/** Base schema for a Stacquer package's details. */
export const packageAttributesSchema =
    z.strictObject({
        /** The unique ID of the linked package. */
        id: packageIdSchema,

        /** The name of the linked package. */
        name: nameSchema,

        /* A short summary of the package. */
        summary: summarySchema.optional(),

        /* A longer description of the package. */
        description: descriptionSchema.optional(),
    })


/** Schema for a package. */
export const packageSchema = packageAttributesSchema.readonly()

export type Package = z.infer<typeof packageSchema>


/** Sub-schema for package creation. */
export const packageCreationSchema =
    z.strictObject({
        ...packageAttributesSchema.shape,
        parentPackageId: packageIdSchema
    }).readonly()

export type PackageCreation = z.infer<typeof packageCreationSchema>


/** Sub-schema for package updates. */
export const packageUpdateSchema =
    z.strictObject({
        ...packageAttributesSchema.partial({
            name: true
        }).shape
    }).readonly()

export type PackageUpdate = z.infer<typeof packageUpdateSchema>


/** Schema for a package with related items populated. */
export const packageGraphSchema =
    z.strictObject({
        ...packageAttributesSchema.shape,

        parentPackages: packageSchema.array(),
        subPackages: packageSchema.array(),

        dependentPackages: packageSchema.array(),
        precedentPackages: packageSchema.array(),
    }).readonly()

export type PackageGraph = z.infer<typeof packageGraphSchema>

