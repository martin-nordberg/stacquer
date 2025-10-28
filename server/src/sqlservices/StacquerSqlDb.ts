import {Database, Statement} from 'bun:sqlite';
import {rootPackageId} from "$shared/domain/structure/Package";


export class StacquerSqlDb {

    readonly db

    readonly queriesByKey: Map<string,Statement>

    constructor() {
        this.db = new Database(':memory:')
        this.queriesByKey = new Map()

        this.#initDdl()
    }

    all(queryKey: string, sql: () => string, bindings: any) {
        let query = this.#prepareQuery(queryKey, sql)
        return query.all(bindings)
    }

    get(queryKey: string, sql: () => string, bindings: any) {
        let query = this.#prepareQuery(queryKey, sql)
        return query.get(bindings)
    }

    run(queryKey: string, sql: () => string, bindings: any) {
        let query = this.#prepareQuery(queryKey, sql)
        query.run(bindings)
    }

    #initDdl() {
        let query = this.db.query(
            `CREATE TABLE Package
             (
                 id          TEXT(28) NOT NULL,
                 name        TEXT(100) NOT NULL,
                 summary     TEXT(200),
                 description TEXT,
                 CONSTRAINT Package_PK PRIMARY KEY (id)
             );`
        )
        query.run()

        query = this.db.query(
            `CREATE TABLE PackageSubPackage
             (
                 parentPackageId TEXT(28) NOT NULL,
                 subPackageId    TEXT(28) NOT NULL,
                 CONSTRAINT PackageSubPackage_ParentPackage_FK FOREIGN KEY (parentPackageId) REFERENCES Package (id) ON DELETE CASCADE,
                 CONSTRAINT PackageSubPackage_SubPackage_FK FOREIGN KEY (subPackageId) REFERENCES Package (id) ON DELETE CASCADE
             );`
        )
        query.run()

        query = this.db.query(
            `INSERT INTO Package (id, name, summary, description)
             VALUES ($id, $name, $summary, $description);`)
        query.run({
            $id: rootPackageId,
            $name: "$",
            $summary: "The root package.",
            $description: "This is the predefined topmost package.",
        })
    }

    #prepareQuery(queryKey: string, sql: () => string) {
        let query = this.queriesByKey.get(queryKey)
        if (!query) {
            query = this.db.query(sql())
            this.queriesByKey.set(queryKey, query)
        }
        return query
    }

}

