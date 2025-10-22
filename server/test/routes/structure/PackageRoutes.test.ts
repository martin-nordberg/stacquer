import {describe, expect, it} from 'bun:test'
import app from '../../../src'
import {genPackageId, packageUpdateSchema, rootPackageId} from "$shared/domain/structure/Package";
import {genCommandId} from "$shared/commandservices/CommandId";

describe('Package operations', () => {
    it('Should return the root package', async () => {
        const req = new Request('http://localhost/queries/packages')
        const res = await app.fetch(req)
        expect(res.status).toBe(200)
        const rootPackage: any = await res.json()
        expect(rootPackage.id).toBe(rootPackageId)
        expect(rootPackage.name).toBe("$")
    })

    it('Should create and then find and update a package', async () => {
        const id = genPackageId()
        const pkg0 = {
            id: id,
            name: "Sample",
            summary: "An example package",
        }

        const cmdId = genCommandId()
        const req = new Request('http://localhost/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmdType: 'structure/package/create',
                cmdId,
                origin: 'testing',
                createdAt: new Date().toISOString(),
                payload: {...pkg0, parentPackageId: rootPackageId}
            }),
        })

        const res = await app.fetch(req)

        expect(res.status).toBe(201)

        const req2 = new Request(`http://localhost/queries/packages/${id}/graph`)
        const res2 = await app.fetch(req2)
        expect(res2.status).toBe(200)
        expect(await res2.json()).toEqual({
            ...pkg0,
            parentPackages: [
                {
                    description: "This is the predefined topmost package.",
                    id: "pckgthestacquerrootpackageid",
                    name: "$",
                    summary: "The root package.",
                }
            ],
            subPackages: [],
        })

        const req3 = new Request('http://localhost/queries/packages')
        const res3 = await app.fetch(req3)
        expect(res3.status).toBe(200)
        const rootPackage: any = await res3.json()
        expect(rootPackage.id).toBe(rootPackageId)
        expect(rootPackage.name).toBe("$")

        const pkg4 = {
            id: id,
            name: "Zample"
        }
        expect(() => packageUpdateSchema.parse(pkg4)).not.toThrow()
        const req4 = new Request('http://localhost/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmdType: 'structure/package/update',
                cmdId,
                origin: 'testing',
                createdAt: new Date().toISOString(),
                payload: pkg4
            }),
        });
        const res4 = await app.fetch(req4)
        expect(res4.status).toBe(201)

        const req5 = new Request(`http://localhost/queries/packages/${id}/graph`)
        const res5 = await app.fetch(req5)
        expect(res5.status).toBe(200)
        expect(await res5.json()).toEqual({
            ...pkg0,
            ...pkg4,
            parentPackages: [
                {
                    description: "This is the predefined topmost package.",
                    id: "pckgthestacquerrootpackageid",
                    name: "$",
                    summary: "The root package.",
                }
            ],
            subPackages: [],
        })

    })

    it('Should fail to create an unnamed package', async () => {
        const id = genPackageId()
        const pkg = {
            id: id,
            summary: "An example package",
            parentPackageId: rootPackageId,
        }

        const req = new Request('http://localhost/commands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cmdType: 'structure/package/create',
                cmdId: genCommandId(),
                origin: 'testing',
                createdAt: new Date().toISOString(),
                payload: pkg
            }),
        })

        const res = await app.fetch(req)

        expect(res.status).toBe(400)
        expect(await res.json()).toEqual([{
            expected: "string",
            code: "invalid_type",
            path: ["payload", "name"],
            message: "Invalid input: expected string, received undefined"
        }])
    })
})