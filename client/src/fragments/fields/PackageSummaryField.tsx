import type {Package} from "$shared/domain/structure/Package.ts";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import {buildPackageUpdateCmd} from "$shared/commandservices/structure/PackageCmdSvcs.ts";
import {summaryMaxLength, summarySchema} from "$shared/domain/core/Summary.ts";
import {createEffect, createSignal} from "solid-js";

type PackageSummaryFieldProps = {
    inputId: string,
    pkg: Package,
}

const PackageSummaryField = (props: PackageSummaryFieldProps) => {

    const [getSummary, setSummary] = createSignal(props.pkg.summary)
    createEffect(() => setSummary(props.pkg.summary))

    const changePackageSummary = (event: FocusEvent) => {
        const summary = (event.target as HTMLInputElement).value

        if (summary != getSummary() && (summary || getSummary())) {
            setSummary(summarySchema.parse(summary))
            packageClientService.updatePackage(buildPackageUpdateCmd({
                id: props.pkg.id,
                summary: getSummary(),
            }, "origin_todo"))
        }
    }

    return (
        <input id={props.inputId} class="italic" placeholder="(Enter a summary ...)" type="text"
               maxlength={summaryMaxLength}
               value={getSummary() ?? ""} on:blur={changePackageSummary}/>
    )
}

export default PackageSummaryField
