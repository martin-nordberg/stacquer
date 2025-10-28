import PageTitle from "../../fragments/PageTitle.tsx";
import PackageBrowseView from "../../components/structure/rootpackage/PackageBrowseView.tsx";
import {useParams} from "@solidjs/router";
import {packageIdSchema, rootPackageId} from "$shared/domain/structure/Package.ts";
import {createEffect, createResource, createSignal, For, Show} from "solid-js";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import PackageNameField from "../../fragments/fields/PackageNameField.tsx";
import PackageLink from "../../fragments/links/PackageLink.tsx";
import {TbFolder} from "solid-icons/tb";
import RootPackageLink from "../../fragments/links/RootPackageLink.tsx";

const PackagePage = () => {

    const params = useParams()

    const parsePkgId = () => packageIdSchema.parse(params['id'])

    const [pkgId, setPkgId] = createSignal(parsePkgId())

    const [pkg] = createResource(pkgId, () => packageClientService.findPackageGraphById(pkgId()))

    createEffect(() => {
        setPkgId(parsePkgId())
    })

    return (
        <Show when={pkg()} fallback={<PageTitle>Loading ...</PageTitle>}>
            <PageTitle>
                <div class="inline">
                    <For each={pkg()!.parentPackages}>{(subpkg) =>
                        <>
                            <Show when={subpkg.id != rootPackageId} fallback={
                                <>
                                    <RootPackageLink inline/>
                                    <span class="mr-1.5 text-green-700">:</span>
                                </>
                            }>
                                <PackageLink inline pkg={subpkg}/>
                                <span class="ml-1.5 mr-1.5">.</span>
                            </Show>
                            <TbFolder class="inline-block mr-1" size="24" color="#D9B99B"></TbFolder>
                        </>
                    }
                    </For>
                    <PackageNameField pkg={pkg()!}></PackageNameField>
                </div>
            </PageTitle>
            <PackageBrowseView pkg={pkg()!}></PackageBrowseView>
        </Show>
    )
}

export default PackagePage
