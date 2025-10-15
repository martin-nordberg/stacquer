import RootPackageBrowseView from "../../components/structure/rootpackage/RootPackageBrowseView.tsx";
import PageTitle from "../../fragments/PageTitle.tsx";

const RootPackagePage = () => {
    // const [pkg] = createResource(() => packageClientService.findRootPackage());

    return (
        <>
            <PageTitle>Top Level Packages</PageTitle>
            <RootPackageBrowseView></RootPackageBrowseView>
        </>
    )
}

export default RootPackagePage
