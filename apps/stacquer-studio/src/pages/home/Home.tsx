import { createResource } from 'solid-js'
import HomeBreadCrumb from "../../components/breadcrumbs/HomeBreadCrumb.tsx";
import {A} from "@solidjs/router";

function Home() {
    // The fetcher function
    const fetchAbout = async () => {
        const response = await fetch(`http://localhost:3000/about`);
        return response.json();
    };

    const [about] = createResource(fetchAbout);

    return (
        <>
            <HomeBreadCrumb/>
            <h1>{about() ? about().name + " " + about().version : "Loading ..."}</h1>
            <A href="/organizations">Organizations</A>
        </>
    )
}

export default Home
