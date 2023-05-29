// Libraries
import WebSocket from 'ws'

// Entities
import { SessionClient, Session } from 'entities'

// Types
import { SessionsMap } from '@types'

// Constants
import { errors, serverEventNames } from '../constants'

// Utils
import { findSession, handleEventError, sendPayloadToClients } from 'utils'
import { joinSessionPayload } from 'payloads/server.payloads'

export const startSession = (ws: WebSocket, sessions: SessionsMap, clientPayload: any) => {
  sessions.set(ws, new Session(clientPayload.maxNumberOfPlayers ?? 2, new SessionClient(ws, clientPayload.name)))
  const id = sessions.get(ws)?.id

  const payload = {
    id,
    maxNumberOfPlayers: clientPayload.maxNumberOfPlayers
  }
  ws.emit(serverEventNames.startSession, payload)
}

export const joinSession = (ws: WebSocket, sessionsMap: SessionsMap, sessionId: string, clientName: string) => {
  const session = findSession(sessionsMap, sessionId)
  if (!session) {
    handleEventError(ws, errors.sessionNotFound)
    return
  }
  session.addClient(new SessionClient(ws, clientName))

  sendPayloadToClients(
    session.clients,
    (targetClient) => joinSessionPayload(session, targetClient.webSocket === ws),
    serverEventNames.joinSession
  )
}

export const closeSession = (ws: WebSocket, sessionsMap: SessionsMap) => {
  const session = sessionsMap.get(ws)
  // TODO: handle when session is not found
  if (!session) return
  if (session.clients.length <= 1) {
    sessionsMap.delete(ws)
  }
}
