// Libraries
import Joi from 'joi'

// Constants
import { serverEventNames } from '../constants'

export const serverSchema = Joi.object({
  clientId: Joi.string().uuid({
    version: ['uuidv1']
  }),
  eventName: Joi.string().valid([Object.values(serverEventNames)]),
  propertyToUpdate: Joi.string().valid('isReady')
})
