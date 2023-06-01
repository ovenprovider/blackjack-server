// Libraries
import { z } from 'zod'

// Schema
import { baseSchema } from './'

// Enums
import { ServerEventNames } from 'enums'

export const serverSchema = baseSchema
  .extend({
    eventName: z.nativeEnum(ServerEventNames)
  })
  .required()
