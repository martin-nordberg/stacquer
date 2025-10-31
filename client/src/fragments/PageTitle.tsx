import type {JSXElement} from "solid-js";

interface PageTitleProps {
    children: JSXElement | JSXElement[]
}


const PageTitle = (props: PageTitleProps) => {
    return (
        <h1 class="text-2xl p-1 bg-blue-100 border-b border-t-2 border-blue-900">{props.children}</h1>
    )
}

export default PageTitle
