import type {Command} from "$shared/commandservices/CommandSvcs";
import {appendFile} from 'node:fs/promises';

export const writeCommandToYaml = async (cmd: Command) => {
    const yaml = Bun.YAML.stringify(cmd, null, 2)

    await appendFile('../examples/testing/test.yaml', yaml + "\n---\n");
}