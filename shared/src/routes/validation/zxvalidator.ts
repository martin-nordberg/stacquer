import {z} from "zod";
import {type ValidationTargets} from "hono";
import {zValidator} from "@hono/zod-validator";
import {HTTPException} from "hono/http-exception";


export const zxValidator = <T extends z.ZodType, Target extends keyof ValidationTargets>(
    target: Target,
    schema: T
) =>
    zValidator(target, schema, (result, _) => {
        if (result.success == false) {
            //console.log("zxValidator error: ", result.error.message)
            throw new HTTPException(400, {message: result.error.message, cause: result.error})
        }
    })

