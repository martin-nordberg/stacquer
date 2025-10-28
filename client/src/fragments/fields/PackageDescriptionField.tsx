import type {Package} from "$shared/domain/structure/Package.ts";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import {buildPackageUpdateCmd} from "$shared/commandservices/structure/PackageCmdSvcs.ts";

type PackageDescriptionFieldProps = {
    inputId: string,
    pkg: Package,
}

const PackageDescriptionField = (props: PackageDescriptionFieldProps) => {

    const changePackageDescription = (event: FocusEvent) => {
        packageClientService.updatePackage(buildPackageUpdateCmd({
            id: props.pkg.id,
            description: (event.target as HTMLInputElement).value,
        }, "origin_todo"))
    }

    return (
        <textarea id={props.inputId} class="italic" placeholder="(Enter a description ...)" value={props.pkg.description??""} on:blur={changePackageDescription}/>
    )
}

export default PackageDescriptionField
