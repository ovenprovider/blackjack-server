// Libraries
import { z } from 'zod'

// Constants
import { allowedPropertyNamesForGameEvent, allowedPropertyNamesForSessionEvent } from '../constants'

// Enums
import { GameEventNames, ServerEventNames, SessionEventNames } from 'enums'

const baseSchema = z
  .object({
    clientId: z.string().uuid(),
    clientName: z.string().max(12)
  })
  .required()

export const serverSchema = z
  .discriminatedUnion('eventName', [
    z.object({
      eventName: z.nativeEnum(ServerEventNames)
    }),
    z.object({
      eventName: z.string().includes(ServerEventNames.joinSession),
      sessionId: z.string().uuid()
    }),
    z.object({
      eventName: z.nativeEnum(SessionEventNames),
      sessionId: z.string().uuid(),
      propertyToUpdate: z.enum(allowedPropertyNamesForSessionEvent)
    }),
    z.object({
      eventName: z.nativeEnum(GameEventNames),
      sessionId: z.string().uuid(),
      propertyToUpdate: z.enum(allowedPropertyNamesForGameEvent)
    })
  ])
  .and(baseSchema)
