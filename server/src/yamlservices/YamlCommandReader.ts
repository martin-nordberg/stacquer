import {type Command, commandSchema, dispatchCmd, type ICommandSvc} from "$shared/commandservices/CommandSvcs";


export const readYamlToCommands = async (service: ICommandSvc, chain: (cmd: Command) => void) => {
    try {
        const file = Bun.file("../examples/testing/test.yaml");
        const fileContent = await file.text();
        const cmds = Bun.YAML.parse(fileContent) as object[]

        // Because of the way YAML separators are written, the last element is empty/null.
        cmds.pop()

        cmds.forEach((cmd) => {
            dispatchCmd(commandSchema.parse(cmd), service, chain)
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error reading file:", error.message);
            // You can add more specific error handling here based on the error type
            if (error.name === 'NotFoundError') {
                console.error("File not found.");
            } else if (error.name === 'PermissionDeniedError') {
                console.error("Permission denied to read file.");
            }
        } else {
            console.error("Unknwon error reading file.")
        }
    }
}