import {genPackageId, type Package} from "$shared/domain/structure/Package.ts";
import {useNavigate} from "@solidjs/router";
import {TbFolderPlus} from 'solid-icons/tb'
import {packageClientService} from "../../clients/structure/PackageClient.ts";

type PackageAddLinkProps = {
    parentPkg: Package
}

const PackageAddLink = (props: PackageAddLinkProps) => {

    const navigate = useNavigate()

    const createAndOpenPackage = async () => {

        const id = genPackageId()

        await packageClientService.createPackage({
            id,
            name: "newpackage",
            parentPackage: {
                id: props.parentPkg.id,
                name: props.parentPkg.name,
            }
        })

        // Then navigate to the desired path
        navigate(`/projects/${id}`);
    }

    return (
        <>
            <button class="hover:underline flex items-center gap-1.5" onClick={createAndOpenPackage}>
                <span class="inline-block"><TbFolderPlus size="22" color="#D9B99B"/></span>
                <span>[Add a package ...]</span>
            </button>
        </>
    )
}

export default PackageAddLink
