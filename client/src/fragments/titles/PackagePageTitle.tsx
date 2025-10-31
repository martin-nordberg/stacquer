import PageTitle from "../../fragments/PageTitle.tsx";
import {type PackageGraph, rootPackageId} from "$shared/domain/structure/Package.ts";
import {For, Show} from "solid-js";
import PackageNameField from "../../fragments/fields/PackageNameField.tsx";
import PackageLink from "../../fragments/links/PackageLink.tsx";
import {TbFolder} from "solid-icons/tb";
import RootPackageLink from "../../fragments/links/RootPackageLink.tsx";

type PackagePageTitleProps = {
    pkg: PackageGraph,
}

const PackagePageTitle = (props: PackagePageTitleProps) => {
    return (
        <PageTitle>
            <div class="inline">
                <For each={props.pkg.parentPackages}>{(subpkg) =>
                    <>
                        <Show when={subpkg.id != rootPackageId} fallback={
                            <>
                                <RootPackageLink inline/>
                                <span class="ml-1 mr-1.5 text-blue-900">:</span>
                            </>
                        }>
                            <PackageLink inline pkg={subpkg}/>
                            <span class="ml-1.5 mr-1.5">.</span>
                        </Show>
                        <TbFolder class="inline-block mr-1" size="24" color="#D9B99B"></TbFolder>
                    </>
                }
                </For>
                <PackageNameField pkg={props.pkg}></PackageNameField>
            </div>
        </PageTitle>
    )
}

export default PackagePageTitle
