
import { Hono } from 'hono'

const organizationsRoute = new Hono()

organizationsRoute.get('/', (c) => {
    const mockOrgs = [
        {
            id: 'abc123',
            name: "Abc"
        },
        {
            id: 'def123',
            name: "Def"
        },
        {
            id: 'pqr123',
            name: "Pqr"
        },
        {
            id: 'stu123',
            name: "Stu"
        },
        {
            id: 'xyz123',
            name: "Xyz"
        },
        {
            id: 'lmn123',
            name: "Lmn"
        },
    ]

    return c.json(mockOrgs)
})

export default organizationsRoute
