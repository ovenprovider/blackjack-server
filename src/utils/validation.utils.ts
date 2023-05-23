import { eventNames } from "constants/eventNames.constants"

// TODO: after typing the payloads, programmatically fill the array with allowed properties
const allowedProperties = [
  'id', 'action', 'type', 'numberOfPlayers'
]

export const validateClientEventPayload = (clientPayload: any) => {
  Object.keys(clientPayload).forEach((key) => {
    if (!allowedProperties.includes(key) ) {
      return false
    }
  })
  return true
}

export const validateClientEventPayloadAction = (clientPayload: any) => {
  return !Object.values(eventNames).includes(clientPayload.action)
}