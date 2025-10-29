import type {Package} from "$shared/domain/structure/Package.ts";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import {buildPackageUpdateCmd} from "$shared/commandservices/structure/PackageCmdSvcs.ts";
import {nameSchema} from "$shared/domain/core/Name.ts";
import {createEffect, createSignal} from "solid-js";

type PackageNameFieldProps = {
    pkg: Package,
}

const PackageNameField = (props: PackageNameFieldProps) => {

    const [getName, setPriorName] = createSignal(props.pkg.name)
    createEffect(() => setPriorName(props.pkg.name))

    const changePackageName = (event: FocusEvent) => {
        const name = (event.target as HTMLInputElement).value

        if (name != getName()) {
            setPriorName(nameSchema.parse(name))
            packageClientService.updatePackage(buildPackageUpdateCmd({
                id: props.pkg.id,
                name: getName(),
            }, "origin_todo"))
        }
    }

    return (
        <input id={props.pkg.id + "Name"} class="font-bold italic" type="text" value={getName()}
               on:blur={changePackageName}/>
    )
}

export default PackageNameField
