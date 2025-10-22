import {describe, expect, it} from 'bun:test'
import {
    genPackageId, packageCreationSchema,
    packageSchema,
    packageUpdateSchema,
    rootPackageId
} from "../../../src/domain/structure/Package";
import {z} from "zod";

describe('Sample packages parse correctly', () => {
    it('Should parse without error', () => {
        const id = genPackageId()
        const pkg = packageSchema.parse(
            {
                id: id,
                name: 'example',
                summary: "an example of a package",
                description: "A description can carry over\nmultiple lines.",
            }
        )

        expect(pkg.id).toBe(id)
        expect(pkg.name).toBe('example')
        expect(pkg.summary).toBe('an example of a package')
        expect(pkg.description).toBe('A description can carry over\nmultiple lines.')
    })

    it('Should parse without error when optional fields are absent', () => {
        const id = genPackageId()
        const pkg = packageCreationSchema.parse(
            {
                id: id,
                parentPackageId: rootPackageId,
                name: 'example'
            }
        )

        expect(pkg.id).toBe(id)
        expect(pkg.name).toBe('example')
        expect(pkg.summary).toBeUndefined()
        expect(pkg.description).toBeUndefined()
    })

    it('Should convert to JSON', () => {
        const id = genPackageId()
        const pkg = packageCreationSchema.parse(
            {
                id: id,
                parentPackageId: rootPackageId,
                name: 'example',
                summary: "an example of a package"
            }
        )
        const packageJson = JSON.stringify(pkg)

        expect(packageJson).toBe(
            `{"id":"${id}","name":"example","summary":"an example of a package","parentPackageId":"${rootPackageId}"}`
        )
    })

    it('Should parse without error for a name change', () => {
        const id = genPackageId()
        const pkg = packageUpdateSchema.parse(
            {
                id: id,
                name: 'example'
            }
        )

        expect(pkg.id).toBe(id)
        expect(pkg.name).toBe('example')
        expect(pkg.summary).toBeUndefined()
        expect(pkg.description).toBeUndefined()
    })

    it('Should parse without error for documentation changes', () => {
        const id = genPackageId()
        const pkg = packageUpdateSchema.parse(
            {
                id: id,
                summary: 'Revised summary',
                description: 'A revised description carried over\nmultiple lines.',
            }
        )

        expect(pkg.id).toBe(id)
        expect(pkg.name).toBeUndefined()
        expect(pkg.summary).toBe("Revised summary")
        expect(pkg.description).toBe("A revised description carried over\nmultiple lines.")
    })

    it('Should generate JSON schema', () => {
        const jsonSchema = z.toJSONSchema(packageSchema)
        expect(jsonSchema).toMatchObject({
            $schema: "https://json-schema.org/draft/2020-12/schema",
            additionalProperties: false,
            properties: {
                description: {
                    minLength: 1,
                    type: "string",
                },
                id: {
                    allOf: [
                        {
                            pattern: "^[0-9a-z]+$",
                        },
                        {
                            pattern: "^pckg.*",
                        }
                    ],
                    format: "cuid2",
                    type: "string",
                },
                name: {
                    maxLength: 200,
                    minLength: 1,
                    pattern: "^[a-zA-Z_$][a-zA-Z0-9_$]*$",
                    type: "string",
                },
                summary: {
                    maxLength: 200,
                    minLength: 1,
                    pattern: "^[^\\r\\n]*$",
                    type: "string",
                },
            },
            readOnly: true,
            required: [
                "id",
                "name",
            ],
            type: "object",
        })
    })

})