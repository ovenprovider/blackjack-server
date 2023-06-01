// Libraries
import { z } from 'zod'

// Enums
import { GameEventNames, ServerEventNames, SessionEventNames } from 'enums'

type baseSchema = {
  clientId?: string
}
export const baseSchema = z
  .object({
    clientId: z.string().uuid(),
    clientName: z.string().max(12)
  })
  .required()

export const withEventSchema = (
  validEventNames: GameEventNames | ServerEventNames | SessionEventNames,
  validPropertiesToUpdate: string[]
) =>
  z.object({
    sessionId: z.string().uuid(),
    eventName: z.nativeEnum(validEventNames),
    propertyToUpdate: z.tuple(validPropertiesToUpdate)
  }).required
