import {A} from "@solidjs/router";
import HomeBreadCrumb from "./HomeBreadCrumb.tsx";
import styles from "./Breadcrumbs.module.css"

function OrganizationsBreadCrumb(props: any) {
    return (
        <HomeBreadCrumb>
            <li class={styles.nav_separator}>&gt;</li>
            <li><A href="/organizations">Organizations</A></li>
            {props.children}
        </HomeBreadCrumb>
    )
}

export default OrganizationsBreadCrumb

