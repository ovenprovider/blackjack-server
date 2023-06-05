// Libraries
import WebSocket from 'ws'

// TODO: add validation library and remove these
const allowedProperties = ['id', 'action', 'type', 'numberOfPlayers']
const allowedValueTypes = ['string', 'object', 'number', 'boolean']

export const validateClientEventPayload = (clientPayload: any) => {
  const keysAreValid = !!Object.keys(clientPayload).find((key) => {
    if (!allowedProperties.includes(key)) {
      return false
    }
  })

  const valuesAreValid = !!Object.values(clientPayload).find((value) => {
    if (!allowedValueTypes.includes(typeof value)) {
      return false
    }
  })

  return keysAreValid && valuesAreValid
}

export const verifyUserRequest = (ws: WebSocket, sessionId: string) => {
  return
}
