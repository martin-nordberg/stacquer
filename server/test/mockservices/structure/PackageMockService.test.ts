import {describe, expect, it} from 'bun:test'
import {genPackageId, rootPackageId} from "$shared/domain/structure/Package";
import {PackageMockService} from "../../../src/mockservices/structure/PackageMockService";
import {buildPackageCreateCmd, buildPackageUpdateCmd} from "$shared/commandservices/structure/PackageCmdSvcs";

const rootPkg = {
    description: "This is the predefined topmost package.",
    id: rootPackageId,
    name: "$",
    summary: "The root package.",
}

describe('Package Mock Services', () => {
    it('Should return the root package', async () => {
        const svc = new PackageMockService()
        const rootPackage = await svc.findRootPackageGraph()
        expect(rootPackage).toMatchObject(rootPkg)
    })

    it('Should create and then find and update a package', async () => {
        const svc = new PackageMockService()
        const id = genPackageId()
        const pkg0 = {
            id: id,
            name: "Sample",
            summary: "An example package",
        }

        await svc.createPackage(buildPackageCreateCmd({...pkg0, parentPackageId: rootPackageId}, "testing"))

        const pkg2 = await svc.findPackageById(id)

        expect(pkg2).toMatchObject(pkg0)

        const parentPkgs = await svc.findParentPackages(id)

        expect(parentPkgs).toEqual([rootPkg])

        const pkg3 = await svc.findPackageGraphById(id)

        expect(pkg3).toMatchObject({
            ...pkg0,
            parentPackages: [rootPkg],
            subPackages: []
        })

        await svc.updatePackage(buildPackageUpdateCmd({
            id,
            name: "Zample"
            }, "Testing"))

        const pkg5 = await svc.findPackageById(id)

        expect(pkg5).toMatchObject({
            ...pkg0,
            name: "Zample"
        })
    })

})