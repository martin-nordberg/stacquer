

import { Type, type Static } from '@sinclair/typebox'

export const OrganizationSchema = Type.Object({
    id: Type.String(),
    name: Type.String()
})

export type Organization = Static<typeof OrganizationSchema>
