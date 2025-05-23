import {Hono} from 'hono'
import {HTTPException} from "hono/http-exception";
import type {Organization} from "$shared/domain/organizations/Organization.js";

/** Endpoints for organizations. */
export const organizationRoutes = new Hono()

// Return the full list of all organizations.
organizationRoutes.get('/', (c) => {
    return c.json(mockOrganizations)
})

// Create a new organization.
organizationRoutes.post('/', async (c) => {
    const result = await c.req.json<Organization>()
    mockOrganizations.push(result)
    mockOrganizations.sort()
    return c.json(result, 201)
})

// Return an organization by its ID.
organizationRoutes.get('/:id', (c) => {
    const result = mockOrganizations.find((org) => org.id === c.req.param('id'))
    if (!result) {
        throw new HTTPException(404, {message: "Organization not found"})
    }
    return c.json(result)
})

// Delete an organization by its ID.
organizationRoutes.delete('/:id', (c) => {
    const orgIndex = mockOrganizations.findIndex((org) => org.id == c.req.param('id'))
    if (orgIndex < 0) {
        throw new HTTPException(404, {message: "Organization not found"})
    }
    mockOrganizations.splice(orgIndex, 1)
    c.status(204)
    return c.body('')
})

/** Just keep a list of organizations in memory. */
let mockOrganizations: Organization[] = [
    {
        id: "one",
        name: "Org One"
    },
    {
        id: "two",
        name: "Org Two"
    }
]