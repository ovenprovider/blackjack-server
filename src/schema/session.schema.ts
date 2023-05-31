// Libraries
import Joi from 'joi'

// Constants
import { sessionEventNames } from '../constants'

export const sessionSchema = Joi.object({
  clientId: Joi.string().uuid({
    version: ['uuidv1']
  }),
  eventName: Joi.string().valid([Object.values(sessionEventNames)]),
  propertyToUpdate: Joi.string().valid('isReady')
})
