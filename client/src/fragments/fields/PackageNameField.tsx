import type {Package} from "$shared/domain/structure/Package.ts";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import {buildPackageUpdateCmd} from "$shared/commandservices/structure/PackageCmdSvcs.ts";

type PackageNameFieldProps = {
    pkg: Package,
}

const PackageNameField = (props: PackageNameFieldProps) => {

    const changePackageName = (event: FocusEvent) => {
        packageClientService.updatePackage(buildPackageUpdateCmd({
            id: props.pkg.id,
            name: (event.target as HTMLInputElement).value,
        }, "origin_todo"))
    }

    return (
        <>
            <input type="text" value={props.pkg.name} on:blur={changePackageName}/>
        </>
    )
}

export default PackageNameField
