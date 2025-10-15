import PageTitle from "../../fragments/PageTitle.tsx";
import PackageBrowseView from "../../components/structure/rootpackage/PackageBrowseView.tsx";
import {useParams} from "@solidjs/router";
import {packageIdSchema} from "$shared/domain/structure/Package.ts";
import {createEffect, createResource, createSignal, Show} from "solid-js";
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import PackageNameField from "../../fragments/fields/PackageNameField.tsx";

const PackagePage = () => {

    const params = useParams()

    const parsePkgId = () => packageIdSchema.parse(params['id'])

    const [pkgId, setPkgId] = createSignal(parsePkgId())

    const [pkg] = createResource(pkgId, () => packageClientService.findPackageById(pkgId()))

    createEffect(() => {
        setPkgId(parsePkgId())
    })

    return (
        <>
            <Show when={!pkg()}>
                <PageTitle>Loading ...</PageTitle>
            </Show>
            <Show when={pkg()}>
                <PageTitle>
                    <PackageNameField pkg={pkg()!}></PackageNameField>
                </PageTitle>
                <PackageBrowseView pkg={pkg()!}></PackageBrowseView>
            </Show>
        </>
    )
}

export default PackagePage
