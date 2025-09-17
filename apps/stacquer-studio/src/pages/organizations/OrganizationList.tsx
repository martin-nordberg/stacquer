import {A} from "@solidjs/router";
import {createResource, For} from "solid-js";
import OrganizationsBreadCrumb from "../../components/breadcrumbs/OrganizationsBreadCrumb.tsx";

function OrganizationList(_props: any) {

    const fetchOrganizations = async () => {
        const response = await fetch(`http://10.0.0.3:3000/organizations`)
        return response.json()
    }

    const [organizations] = createResource(fetchOrganizations)

    return (
        <>
            <OrganizationsBreadCrumb/>
            <h1>Organizations</h1>
            <For each={organizations()}>
                {(org) => <p><A href={`/organizations/${org.id}`}>{org.name}</A></p>}
            </For>
        </>
    )
}

export default OrganizationList
