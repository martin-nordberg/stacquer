import {describe, expect, it} from 'bun:test'
import {
    genPackageId, packageCreationSchema,
    packageSchema, packageUpdateSchema,
    rootPackageId
} from "../../../src/domain/structure/Package";

describe('Sample packages parse correctly', () => {
    it('Should parse without error', () => {
        const id = genPackageId()
        const pkg = packageSchema.parse(
            {
                id: id,
                parentPackage: {
                    id: rootPackageId,
                    name: "$"
                },
                name: 'example',
                summary: "an example of a package",
                description: "A description can carry over\nmultiple lines.",
                subPackages: []
            }
        )

        expect(pkg.id).toBe(id)
        expect(pkg.parentPackage.id).toBe(rootPackageId)
        expect(pkg.name).toBe('example')
        expect(pkg.summary).toBe('an example of a package')
        expect(pkg.description).toBe('A description can carry over\nmultiple lines.')
        expect(pkg.subPackages).toBeEmpty()
    })

    it('Should parse without error when optional fields are absent', () => {
        const id = genPackageId()
        const pkg = packageCreationSchema.parse(
            {
                id: id,
                parentPackage: {
                    id: rootPackageId,
                    name: "$"
                },
                name: 'example'
            }
        )

        expect(pkg.id).toBe(id)
        expect(pkg.parentPackage.id).toBe(rootPackageId)
        expect(pkg.name).toBe('example')
        expect(pkg.summary).toBeUndefined()
        expect(pkg.description).toBeUndefined()
    })

    it('Should convert to JSON', () => {
        const id = genPackageId()
        const pkg = packageSchema.parse(
            {
                id: id,
                parentPackage: {
                    id: rootPackageId,
                    name: "$"
                },
                name: 'example',
                summary: "an example of a package",
                subPackages: []
            }
        )
        const packageJson = JSON.stringify(pkg)

        expect(packageJson).toBe(
            `{"id":"${id}","name":"example","summary":"an example of a package","parentPackage":{"id":"${rootPackageId}","name":"$"},"subPackages":[]}`
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

})