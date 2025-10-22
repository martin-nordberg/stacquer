import {describe, expect, it} from 'bun:test'
import {
    genPackageId,
    packageCreationSchema,
    packageUpdateSchema,
    rootPackageId
} from "../../src/domain/structure/Package";
import {
    buildPackageCreateCmd,
    buildPackageDeleteCmd,
    buildPackageUpdateCmd
} from "../../src/commandservices/structure/PackageCmdSvcs";

describe('Commands are built correctly', () => {
    it('Should build a package create command', async () => {
        const id = genPackageId()
        const pkg = packageCreationSchema.parse(
            {
                id: id,
                name: 'example',
                summary: "an example of a package",
                description: "A description can carry over\nmultiple lines.",
                parentPackageId: rootPackageId,
            }
        )

        const cmd = buildPackageCreateCmd(pkg, "test_origin")

        expect(cmd.cmdId).toBeDefined()
        expect(cmd.cmdType).toEqual('structure/package/create')
        expect(cmd.createdAt).toBeDefined()
        expect(cmd.origin).toEqual('test_origin')
        expect(cmd.payload).toMatchObject(pkg)
    })

    it('Should build a package update command', async () => {
        const id = genPackageId()
        const pkg = packageUpdateSchema.parse(
            {
                id: id,
                summary: "an example of a package",
            }
        )

        const cmd = buildPackageUpdateCmd(pkg, 'test_origin')

        expect(cmd.cmdId).toBeDefined()
        expect(cmd.cmdType).toEqual('structure/package/update')
        expect(cmd.createdAt).toBeDefined()
        expect(cmd.origin).toEqual('test_origin')
        expect(cmd.payload).toMatchObject(pkg)
    })

    it('Should build a package delete command', async () => {
        const id = genPackageId()

        const cmd = buildPackageDeleteCmd(id, 'test_origin')

        expect(cmd.cmdId).toBeDefined()
        expect(cmd.cmdType).toEqual('structure/package/delete')
        expect(cmd.createdAt).toBeDefined()
        expect(cmd.origin).toEqual('test_origin')
        expect(cmd.payload).toEqual(id)
    })

})