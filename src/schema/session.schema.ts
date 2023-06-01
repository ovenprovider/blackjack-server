// Schema
import { baseSchema, withEventSchema } from './'

// Enums
import { SessionEventNames } from 'enums'

export const sessionSchema = baseSchema.extend({
  ...withEventSchema(SessionEventNames, ['isReady'])
})
