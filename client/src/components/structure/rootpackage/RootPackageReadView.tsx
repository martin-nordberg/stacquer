import {createResource, Show} from "solid-js";
import {packageClientService} from "../../../clients/structure/PackageClient.ts";

const RootPackageReadView = () => {
    const [pkg] = createResource(() => packageClientService.findRootPackage());

    return (
        <>
            <Show when={!pkg()}>
                <p>Loading ...</p>
            </Show>
            <Show when={pkg()}>
                <p>Root package ID: {pkg()!.id}</p>
                <p>Root package name: {pkg()!.name}</p>
            </Show>
        </>
    )
}

export default RootPackageReadView
