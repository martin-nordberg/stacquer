import { useParams } from "@solidjs/router";
import OrganizationBreadCrumb from "../../components/breadcrumbs/OrganizationBreadCrumb.tsx";

const Organization = () => {
    const params = useParams()

    return (
        <>
            <OrganizationBreadCrumb name="To Be Fetched"></OrganizationBreadCrumb>
            <p>
                This is the organization with the id of <code>{params.orgId}</code>
            </p>
        </>
    )
}

export default Organization