import type {PackageOverview} from "$shared/domain/structure/Package.ts";
import {packageClientService} from "../../clients/structure/PackageClient.ts";

type PackageNameFieldProps = {
    pkg: PackageOverview,
}

const PackageNameField = (props: PackageNameFieldProps) => {

    const changePackageName = (event: FocusEvent) => {
        packageClientService.updatePackage({
            cmd: 'package-update',
            id: props.pkg.id,
            name: (event.target as HTMLInputElement).value,
        })
    }

    return (
        <>
            <input type="text" value={props.pkg.name} on:blur={changePackageName} />
        </>
    )
}

export default PackageNameField
