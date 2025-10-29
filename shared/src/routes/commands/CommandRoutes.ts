import {Hono} from 'hono'
import {zxValidator} from "../validation/zxvalidator";
import {type Command, commandSchema, dispatchCmd, type ICommandSvc} from "../../commandservices/CommandSvcs";

export const commandRoutes = (
    commandService: ICommandSvc,
    chain: (cmd: Command) => void
) => {

    return new Hono()
        .post(
            '/',
            zxValidator('json', commandSchema),
            async (c) => {
                const command: Command = c.req.valid('json')
                await dispatchCmd(command, commandService, chain)
                return c.body(null, 201)
            }
        )
}

export type CommandRoutes = ReturnType<typeof commandRoutes>
