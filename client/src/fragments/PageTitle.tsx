import type {JSXElement} from "solid-js";

interface PageTitleProps {
    children: JSXElement | JSXElement[]
}


const PageTitle = (props: PageTitleProps) => {
    return (
        <h1 class="text-2xl mt-1">{props.children}</h1>
    )
}

export default PageTitle
