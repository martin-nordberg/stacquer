import type {Package} from "$shared/domain/structure/Package.ts";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import {buildPackageUpdateCmd} from "$shared/commandservices/structure/PackageCmdSvcs.ts";
import {summaryMaxLength} from "$shared/domain/core/Summary.ts";

type PackageSummaryFieldProps = {
    inputId: string,
    pkg: Package,
}

const PackageSummaryField = (props: PackageSummaryFieldProps) => {

    const changePackageSummary = (event: FocusEvent) => {
        packageClientService.updatePackage(buildPackageUpdateCmd({
            id: props.pkg.id,
            summary: (event.target as HTMLInputElement).value,
        }, "origin_todo"))
    }

    return (
        <input id={props.inputId} class="italic" placeholder="(Enter a summary ...)" type="text"
               maxlength={summaryMaxLength}
               value={props.pkg.summary ?? ""} on:blur={changePackageSummary}/>
    )
}

export default PackageSummaryField
