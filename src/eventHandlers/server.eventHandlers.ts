// Libraries
import { WebSocket } from 'ws'

// Types
import { ClientIdsMap, SessionsMap } from '@types'

// Constants
import { serverEventNames, webSocketEventNames } from '../constants'

// Events
import { startSession, joinSession, closeSession } from '../events'

// Payloads
import { onConnectPayload } from 'payloads'

// Utils
import { getUuid, sendPayloadToClient } from 'utils'

export const handleServerEvent = (ws: WebSocket, sessions: SessionsMap, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case serverEventNames.startSession:
      startSession(ws, sessions, clientPayload)
      break
    case serverEventNames.joinSession:
      joinSession(ws, sessions, clientPayload.id, clientPayload.name)
      break
    case serverEventNames.closeSession:
      closeSession(ws, sessions)
      break
    default:
      return
  }
}
