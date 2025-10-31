import {A} from "@solidjs/router";
import {Show} from "solid-js";
import {TbFolder} from 'solid-icons/tb'

type RootPackageLinkProps = {
    inline?: boolean | undefined,
    withFolder?: boolean | undefined,
}

const RootPackageLink = (props: RootPackageLinkProps) => {

    return (
        <A class="hover:underline flex items-center gap-1.5 text-blue-900" classList={{inline: props.inline}}
           href={"/"}>
            <Show when={props.withFolder}>
                    <span class="inline-block">
                        <TbFolder size="22" color="#D9B99B"/>
                    </span>
            </Show>
            <span class="font-bold">Stacquer</span>
        </A>
    )
}

export default RootPackageLink
