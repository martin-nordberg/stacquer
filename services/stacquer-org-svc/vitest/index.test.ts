import {describe, expect, test} from 'vitest'
import {app} from "../src/index.js";

describe('Organization Editing', () => {
    test('GET /organizations', async () => {
        const res = await app.request('/organizations')
        expect(res.status).toBe(200)
        const orgs = await res.json()
        expect(orgs.length).toBe(2)
    })
})