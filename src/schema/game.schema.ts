// Types
import { GameEventNames } from '@types'

// Schema
import { baseSchema, withEventSchema } from './base.schema'

// Constants
import { gameEventNames } from '../enums'

export const gameSchema = baseSchema.keys({
  ...withEventSchema(Object.keys(gameEventNames) as GameEventNames[], [
    'isOnScreen',
    'isHolding',
    'isDrawing',
    'isReadyToRestart'
  ])
})
