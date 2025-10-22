import {For, Show} from "solid-js";
import PackageLink from "../../../fragments/links/PackageLink.tsx";
import PackageAddLink from "../../../fragments/links/PackageAddLink.tsx";
import {type PackageGraph} from "$shared/domain/structure/Package.ts";

type PackageBrowseViewProps = {
    pkg: PackageGraph,
}

const PackageBrowseView = (props: PackageBrowseViewProps) => {
    return (
        <>
            <ul>
                <Show when={props.pkg.subPackages.length == 0}>
                    <li>(No sub packages)</li>
                </Show>
                <Show when={props.pkg.subPackages.length > 0}>
                    <For each={props.pkg.subPackages}>
                        {(subPkg, _) => (
                            <li>
                                <PackageLink pkg={subPkg} withSummary></PackageLink>
                            </li>
                        )}
                    </For>
                </Show>
                <li><PackageAddLink parentPkg={props.pkg}/></li>
            </ul>
        </>
    )
}

export default PackageBrowseView
