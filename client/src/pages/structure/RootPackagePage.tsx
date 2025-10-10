import RootPackageReadView from "../../components/structure/rootpackage/RootPackageReadView.tsx";
import HomeBreadCrumb from "../../components/breadcrumbs/HomeBreadCrumb.tsx";

const RootPackagePage = () => {
    // const [pkg] = createResource(() => packageClientService.findRootPackage());

    return (
        <>
            <HomeBreadCrumb name="To Be Fetched"></HomeBreadCrumb>

            <RootPackageReadView></RootPackageReadView>
        </>
    )
}

export default RootPackagePage
