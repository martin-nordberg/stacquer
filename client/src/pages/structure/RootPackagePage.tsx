import RootPackageBrowseView from "../../components/structure/rootpackage/RootPackageBrowseView.tsx";
import PageTitle from "../../fragments/PageTitle.tsx";
import RootPackageLink from "../../fragments/links/RootPackageLink.tsx";
import FormLabel from "../../fragments/labels/FormLabel.tsx";

const RootPackagePage = () => {
    return (
        <>
            <PageTitle><RootPackageLink inline/></PageTitle>
            <FormLabel>Top Level Packages:</FormLabel>
            <RootPackageBrowseView></RootPackageBrowseView>
        </>
    )
}

export default RootPackagePage
