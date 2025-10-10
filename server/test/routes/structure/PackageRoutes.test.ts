import {describe, expect, it} from 'bun:test'
import app from '../../../src'
import {genPackageId, rootPackageId} from "$shared/domain/structure/Package.ts";

describe('Package operations', () => {
    it('Should return the root package', async () => {
        const req = new Request('http://localhost/queries/packages')
        const res = await app.fetch(req)
        expect(res.status).toBe(200)
        const rootPackage: any = await res.json()
        expect(rootPackage.id).toBe(rootPackageId)
        expect(rootPackage.name).toBe("$")
    })

    it('Should create and then find a package', async () => {
        const id = genPackageId()
        const pkg = {
            cmd: 'package-create',
            id: id,
            name: "Sample",
            summary: "An example package",
            parentPackage: {
                id: rootPackageId,
                name: "$"
            }
        }

        const req = new Request('http://localhost/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pkg),
        });

        const res = await app.fetch(req);

        expect(res.status).toBe(201);
        expect(await res.json()).toEqual({
            ...pkg,
            subPackages: []
        });

        const req2 = new Request(`http://localhost/queries/packages/${id}`)
        const res2 = await app.fetch(req2)
        expect(res2.status).toBe(200)
        expect(await res2.json()).toEqual({
            ...pkg,
            subPackages: []
        })

        const req3 = new Request('http://localhost/queries/packages')
        const res3 = await app.fetch(req3)
        expect(res3.status).toBe(200)
        const rootPackage: any = await res3.json()
        expect(rootPackage.id).toBe(rootPackageId)
        expect(rootPackage.name).toBe("$")
        expect(rootPackage.subPackages.length).toBe(1)
        expect(rootPackage.subPackages[0].id).toBe(id)
        expect(rootPackage.subPackages[0].name).toBe("Sample")
        expect(rootPackage.subPackages[0].summary).toBe("An example package")
    })

    it('Should fail to create an unnamed package', async () => {
        const id = genPackageId()
        const pkg = {
            cmd: 'package-create',
            id: id,
            summary: "An example package",
            parentPackage: {
                id: rootPackageId,
                name: "$"
            }
        }

        const req = new Request('http://localhost/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pkg),
        })

        const res = await app.fetch(req)

        expect(res.status).toBe(400)
        expect(await res.json()).toEqual([{
            expected: "string",
            code: "invalid_type",
            path: ["name"],
            message: "Invalid input: expected string, received undefined"
        }])
    })
})