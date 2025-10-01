import { createResource } from 'solid-js'
import HomeBreadCrumb from "../../components/breadcrumbs/HomeBreadCrumb";
import {A} from "@solidjs/router";
import {type Branded} from "$shared/util/Branded"

function Home() {

    const x : Branded<string, 'whatever'> = "asdgfasdfasdf" as Branded<string, 'whatever'>
    console.log({x})

    // The fetcher function
    const fetchAbout = async () => {
        const response = await fetch(`http://10.0.0.3:3001/about`);
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
