
import { describe, expect, test } from 'vitest'
import {app} from "./index.js";

describe('Example', () => {
    test('GET /', async () => {
        const res = await app.request('/')
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Hello Hono World!')
    })
})