import type {Package} from "$shared/domain/structure/Package.ts";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import {buildPackageUpdateCmd} from "$shared/commandservices/structure/PackageCmdSvcs.ts";
import {descriptionSchema} from "$shared/domain/core/Description.ts";
import {createEffect, createSignal} from "solid-js";

type PackageDescriptionFieldProps = {
    inputId: string,
    pkg: Package,
}

const PackageDescriptionField = (props: PackageDescriptionFieldProps) => {

    const [getDescription, setDescription] = createSignal(props.pkg.description)
    createEffect(() => setDescription(props.pkg.description))

    const changePackageDescription = (event: FocusEvent) => {
        const description = (event.target as HTMLInputElement).value

        if (description != getDescription() && (description || getDescription())) {
            setDescription(descriptionSchema.parse(description))
            packageClientService.updatePackage(buildPackageUpdateCmd({
                id: props.pkg.id,
                description: getDescription(),
            }, "origin_todo"))
        }
    }

    return (
        <textarea id={props.inputId} class="italic w-full" placeholder="(Enter a description ...)"
                  value={getDescription() ?? ""} on:blur={changePackageDescription}/>
    )
}

export default PackageDescriptionField
