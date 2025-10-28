import {For, Show} from "solid-js";
import {type PackageGraph} from "$shared/domain/structure/Package.ts";
import PackageLink from "../links/PackageLink.tsx";
import PackageSummaryField from "./PackageSummaryField.tsx";
import PackageAddLink from "../links/PackageAddLink.tsx";

type SubPackagesListProps = {
    pkg: PackageGraph,
}

const SubPackagesList = (props: SubPackagesListProps) => {
    return (
        <ul>
            <Show when={props.pkg.subPackages.length > 0}>
                <For each={props.pkg.subPackages}>
                    {(subPkg, _) => (
                        <li class="flex items-center gap-1.5">
                            <PackageLink pkg={subPkg} withFolder></PackageLink>
                            <Show when={subPkg.summary}>
                                <span> &ndash; </span>
                                <PackageSummaryField inputId={subPkg.id+"Summary"} pkg={subPkg} />
                            </Show>
                        </li>
                    )}
                </For>
            </Show>
            <li><PackageAddLink parentPkg={props.pkg}/></li>
        </ul>
    )
}

export default SubPackagesList
