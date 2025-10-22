import {createResource, For, Show} from "solid-js";
import {packageClientService} from "../../../clients/structure/PackageClient.ts";
import PackageLink from "../../../fragments/links/PackageLink.tsx";
import PackageAddLink from "../../../fragments/links/PackageAddLink.tsx";

const RootPackageBrowseView = () => {

    const [pkg] = createResource(() => packageClientService.findRootPackageGraph());

    return (
        <>
            <Show when={!pkg()}>
                <p>Loading ...</p>
            </Show>
            <Show when={pkg()}>
                <ul>
                    <Show when={pkg()!.subPackages.length == 0}>
                        <li>(No top level packages)</li>
                    </Show>
                    <Show when={pkg()!.subPackages.length > 0}>
                        <For each={pkg()!.subPackages}>
                            {(subPkg, _) => (
                                <li>
                                    <PackageLink pkg={subPkg} withSummary></PackageLink>
                                </li>
                            )}
                        </For>
                    </Show>
                    <li><PackageAddLink parentPkg={pkg()!}/></li>
                </ul>
            </Show>
        </>
    )
}

export default RootPackageBrowseView
