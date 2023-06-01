// Libraries
import { WebSocket } from 'ws'

// Types
import { ClientIdsMap, SessionsMap } from '@types'

// Enums
import { ServerEventNames, WebSocketEventNames } from '../enums'

// Events
import { startSession, joinSession, closeSession } from '../events'

export const handleServerEvent = (ws: WebSocket, sessions: SessionsMap, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case ServerEventNames.startSession:
      startSession(ws, sessions, clientPayload)
      break
    case ServerEventNames.joinSession:
      joinSession(ws, sessions, clientPayload.id, clientPayload.name)
      break
    case ServerEventNames.closeSession:
      closeSession(ws, sessions)
      break
    default:
      return
  }
}
