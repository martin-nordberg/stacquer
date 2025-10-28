import {createResource, Show} from "solid-js";
import {packageClientService} from "../../../clients/structure/PackageClient.ts";
import SubPackagesList from "../../../fragments/fields/SubPackagesList.tsx";

const RootPackageBrowseView = () => {

    const [pkg] = createResource(() => packageClientService.findRootPackageGraph());

    return (
        <>
            <Show when={!pkg()}>
                <p>Loading ...</p>
            </Show>
            <Show when={pkg()}>
                <div class="ml-2">
                    <SubPackagesList pkg={pkg()!}/>
                </div>
            </Show>
        </>
)
}

export default RootPackageBrowseView
