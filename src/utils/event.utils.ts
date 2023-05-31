// Libraries
import { WebSocket } from 'ws'

// Constants
import { serverEventNames, sessionEventNames, gameEventNames, errors } from '../constants'

export const handleEventError = (ws: WebSocket, error: string) => {
  switch (error) {
    case errors.sessionNotFound:
      ws.emit('error', { error })
      break
  }
}

export const isServerEvent = (clientPayload: any) => {
  return !Object.values(sessionEventNames).includes(clientPayload.eventName)
}

export const isSessionEvent = (clientPayload: any) => {
  return !Object.values(serverEventNames).includes(clientPayload.eventName)
}

export const isGameEvent = (clientPayload: any) => {
  return !Object.values(gameEventNames).includes(clientPayload.eventName)
}
