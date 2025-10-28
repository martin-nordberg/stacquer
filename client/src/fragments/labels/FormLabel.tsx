import type {JSXElement} from "solid-js";

type FormLabelProps = {
    inputId?: string | undefined,
    children: JSXElement | JSXElement[]
}

const FormLabel = (props: FormLabelProps) => {

    return (
        <label for={props.inputId}>
            <span class="font-bold mr-3 text-blue-700">{props.children}</span>
        </label>
    )
}

export default FormLabel
