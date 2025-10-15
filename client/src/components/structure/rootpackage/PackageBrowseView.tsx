import {For, Show} from "solid-js";
import PackageLink from "../../../fragments/links/PackageLink.tsx";
import PackageAddLink from "../../../fragments/links/PackageAddLink.tsx";
import {type Package} from "$shared/domain/structure/Package.ts";

type PackageBrowseViewProps = {
    pkg: Package,
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
                        {(subpkg, _) => (
                            <li>
                                <PackageLink pkg={subpkg} withSummary></PackageLink>
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
