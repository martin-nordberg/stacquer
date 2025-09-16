import {A} from "@solidjs/router";

function HomeBreadCrumb(props: any) {
    return (
        <>
            <nav>
                <ul>
                    <li><A href="/">Stacquer Studio</A></li>
                    {props.children}
                </ul>
            </nav>

        </>
    )
}

export default HomeBreadCrumb

