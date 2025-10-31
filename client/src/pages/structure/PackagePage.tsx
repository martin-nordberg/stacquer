import PageTitle from "../../fragments/PageTitle.tsx";
import PackageBrowseView from "../../components/structure/rootpackage/PackageBrowseView.tsx";
import {useParams} from "@solidjs/router";
import {packageIdSchema} from "$shared/domain/structure/Package.ts";
import {createEffect, createResource, createSignal, Show} from "solid-js";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import PackagePageTitle from "../../fragments/titles/PackagePageTitle.tsx";

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
            <div class="flex flex-col min-h-screen">
                <PackagePageTitle pkg={pkg()!}/>

                <div class="flex flex-col md:flex-row flex-1">
                    <div class="flex-5 bg-orange-50 border border-blue-900 p-1.5">
                        <PackageBrowseView pkg={pkg()!}></PackageBrowseView>
                    </div>

                    <div class="flex-6 bg-gray-50 border border-blue-900 p-1.5">Right Panel</div>
                </div>
            </div>
        </Show>
)
}

export default PackagePage
