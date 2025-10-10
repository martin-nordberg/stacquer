import {A} from "@solidjs/router";
import OrganizationsBreadCrumb from "./OrganizationsBreadCrumb.tsx";
import styles from "./Breadcrumbs.module.css"

function OrganizationBreadCrumb(props: any) {
    return (
        <OrganizationsBreadCrumb>
            <li class={styles["nav_separator"]}>&gt;</li>
            <li><A href=".">{props.name}</A></li>
            {props.children}
        </OrganizationsBreadCrumb>
    )
}

export default OrganizationBreadCrumb

