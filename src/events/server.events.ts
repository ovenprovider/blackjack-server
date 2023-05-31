// Libraries
import WebSocket from 'ws'

// Entities
import { SessionClient, Session } from 'entities'

// Types
import { SessionsMap } from '@types'

// Payloads
import { joinSessionPayload, startSessionPayload } from 'payloads/server.payloads'

// Constants
import { errors, serverEventNames } from '../constants'

// Utils
import { findSession, handleEventError, sendPayloadToClient, sendPayloadToClients } from 'utils'

export const startSession = (ws: WebSocket, sessions: SessionsMap, clientPayload: any) => {
  const maxNumberOfPlayers = clientPayload.maxNumberOfPlayers
  sessions.set(ws, new Session(maxNumberOfPlayers, new SessionClient(ws, clientPayload.name)))

  const session = sessions.get(ws)

  if (!session) {
    return
  }

  sendPayloadToClient(
    ws.emit,
    ws.readyState,
    startSessionPayload(session.id, session.maxNumberOfPlayers),
    serverEventNames.startSession
  )
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
