import {type Package} from "$shared/domain/structure/Package.ts";
import {A} from "@solidjs/router";
import {Show} from "solid-js";
import {TbCornerDownRight, TbFolder} from 'solid-icons/tb'

type PackageLinkProps = {
    fromParent?: boolean | undefined,
    pkg: Package,
    withLink?: boolean | undefined,
    withSummary?: boolean | undefined,
}

const PackageLink = (props: PackageLinkProps) => {

    return (
        <>
            <A class="hover:underline flex items-center gap-1.5" href={"/packages/" + props.pkg.id}>
                <Show when={props.withLink}>
                    <Show when={props.fromParent}>
                        <span class="inline-block">
                            <TbCornerDownRight size="22" color="#D9B99B"/>
                        </span>
                    </Show>
                </Show>
                <span class="inline-block">
                    <TbFolder size="22" color="#D9B99B"/>
                </span>
                <span class="font-bold">{props.pkg.name}</span>
                <Show when={props.withSummary && props.pkg.summary}>
                    <span class="italic"> &ndash; {props.pkg.summary}</span>
                </Show>
            </A>
        </>
    )
}

export default PackageLink
