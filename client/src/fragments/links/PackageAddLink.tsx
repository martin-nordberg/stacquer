import {genPackageId, type Package} from "$shared/domain/structure/Package.ts";
import {useNavigate} from "@solidjs/router";
import {TbFolderPlus} from 'solid-icons/tb'
import {packageClientService} from "../../clients/structure/PackageClient.ts";
import {buildPackageCreateCmd} from "$shared/commandservices/structure/PackageCmdSvcs.ts";

type PackageAddLinkProps = {
    parentPkg: Package
}

const PackageAddLink = (props: PackageAddLinkProps) => {

    const navigate = useNavigate()

    const createAndOpenPackage = async () => {

        const id = genPackageId()

        await packageClientService.createPackage(buildPackageCreateCmd({
            id,
            name: "newpackage",
            parentPackageId: props.parentPkg.id,
        }, "origin_todo"))

        // Then navigate to the desired path
        navigate(`/packages/${id}`);
    }

    return (
        <>
            <button class="hover:underline cursor-pointer flex items-center gap-1.5" onClick={createAndOpenPackage}>
                <span class="inline-block"><TbFolderPlus size="22" color="#D9B99B"/></span>
                <span>[Add a subpackage ...]</span>
            </button>
        </>
    )
}

export default PackageAddLink
