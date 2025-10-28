import {
    type IPackageCmdSvc,
    type PackageCreateCmd,
    type PackageDeleteCmd,
    type PackageUpdateCmd
} from "$shared/commandservices/structure/PackageCmdSvcs";
import {
    type Package,
    type PackageGraph,
    type PackageId,
    packageSchema,
    rootPackageId,
} from "$shared/domain/structure/Package";
import {type IPackageQrySvc} from "$shared/queryservices/structure/IPackageQrySvc";
import {StacquerSqlDb} from "../StacquerSqlDb";
import {dropNulls} from "$shared/util/dropNulls";


export class PackageSqlService implements IPackageQrySvc, IPackageCmdSvc {

    readonly db = new StacquerSqlDb()

    async createPackage(cmd: PackageCreateCmd): Promise<void> {
        this.db.run(
            'package.create.1',
            () =>
                `INSERT INTO Package (id, name, summary, description)
                 VALUES ($id, $name, $summary, $description);`,
            {
                $id: cmd.payload.id,
                $name: cmd.payload.name,
                $summary: cmd.payload.summary ?? null,
                $description: cmd.payload.description ?? null
            }
        )

        this.db.run(
            'package.create.2',
            () =>
                `INSERT INTO PackageSubPackage (parentPackageId, subPackageId)
                 VALUES ($parentPackageId, $subPackageId);`,
            {
                $parentPackageId: cmd.payload.parentPackageId,
                $subPackageId: cmd.payload.id
            }
        )
    }

    async deletePackage(cmd: PackageDeleteCmd): Promise<void> {
        this.db.run(
            'package.delete',
            () =>
                `DELETE
                 FROM Package
                 WHERE id = $id`,
            {$id: cmd.payload}
        )
    }

    async findPackageById(packageId: PackageId): Promise<Package | null> {
        const rec = this.db.get(
            'package.findById',
            () =>
                `SELECT *
                 FROM Package
                 WHERE id = $id`,
            {$id: packageId}
        )
        return packageSchema.parse(dropNulls(rec))
    }

    async findPackageGraphById(packageId: PackageId): Promise<PackageGraph | null> {
        const pkg = await this.findPackageById(packageId)

        if (pkg == null) {
            return null
        }

        const parentPackages = await this.findParentPackages(packageId)
        const subPackages = await this.findSubPackages(packageId)

        return {
            ...pkg,
            parentPackages,
            subPackages
        }
    }

    async findParentPackages(childPackageId: PackageId): Promise<Package[]> {
        if (childPackageId === rootPackageId) {
            return []
        }

        const rec = this.db.get(
            'package.findParent',
            () =>
                `SELECT id, name, summary, description
                 FROM Package
                          JOIN PackageSubPackage ON Package.id = PackageSubPackage.parentPackageId
                 WHERE subPackageId = $id`,
            {$id: childPackageId}
        )

        const parentPkg = packageSchema.parse(dropNulls(rec))

        return [
            ...(await this.findParentPackages(parentPkg.id)),
            parentPkg
        ]
    }

    async findRootPackageGraph(): Promise<PackageGraph> {
        return (await this.findPackageGraphById(rootPackageId))!
    }

    async findSubPackages(parentPackageId: PackageId): Promise<Package[]> {
        const recs = this.db.all(
            'package.findSubPackages',
            () =>
                `SELECT id, name, summary, description
         FROM Package
                  JOIN PackageSubPackage ON Package.id = PackageSubPackage.subPackageId
         WHERE parentPackageId = $id
         ORDER BY name, id`,
            {$id: parentPackageId}
        )

        const result: Package[] = []
        for (let rec of recs) {
            result.push(packageSchema.parse(dropNulls(rec)))
        }
        return result
    }

    async updatePackage(cmd: PackageUpdateCmd): Promise<void> {
        let sql = `UPDATE Package`
        let bindings: any = {$id: cmd.payload.id}
        if (cmd.payload.name) {
            sql += ` SET name = $name`
            bindings.$name = cmd.payload.name
        }
        if (cmd.payload.summary) {
            sql += ` SET summary = $summary`
            bindings.$summary = cmd.payload.summary
        }
        if (cmd.payload.description) {
            sql += ` SET description = $description`
            bindings.$description = cmd.payload.description
        }
        sql += ` WHERE id = $id`

        this.db.db.run(sql, bindings)
    }
}