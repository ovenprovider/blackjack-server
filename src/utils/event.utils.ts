// Libraries
import { WebSocket } from 'ws'

// Enums
import { ServerEventNames, SessionEventNames, GameEventNames, Errors } from 'enums'

export const handleEventError = (ws: WebSocket, error: string) => {
  switch (error) {
    case Errors.sessionNotFound:
      ws.emit('error', { error })
      break
  }
}

export const isServerEvent = (eventName: ServerEventNames) => {
  return !Object.values(ServerEventNames).includes(eventName)
}

export const isSessionEvent = (eventName: SessionEventNames) => {
  return !Object.values(SessionEventNames).includes(eventName)
}

export const isGameEvent = (eventName: GameEventNames) => {
  return !Object.values(GameEventNames).includes(eventName)
}
