import {type PackageGraph} from "$shared/domain/structure/Package.ts";
import PackageSummaryField from "../../../fragments/fields/PackageSummaryField.tsx";
import FormLabel from "../../../fragments/labels/FormLabel.tsx";
import SubPackagesList from "../../../fragments/fields/SubPackagesList.tsx";
import PackageDescriptionField from "../../../fragments/fields/PackageDescriptionField.tsx";

type PackageBrowseViewProps = {
    pkg: PackageGraph,
}

const PackageBrowseView = (props: PackageBrowseViewProps) => {
    return (
        <>
            <FormLabel inputId="summaryField">Summary:</FormLabel>
            <div class="ml-2">
                <PackageSummaryField inputId="summaryField" pkg={props.pkg}/>
            </div>
            <FormLabel inputId="descriptionField">Description:</FormLabel>
            <div class="ml-2">
                <PackageDescriptionField inputId="descriptionField" pkg={props.pkg}/>
            </div>
            <FormLabel>Subpackages:</FormLabel>
            <div class="ml-2">
                <SubPackagesList pkg={props.pkg}/>
            </div>
        </>
    )
}

export default PackageBrowseView
