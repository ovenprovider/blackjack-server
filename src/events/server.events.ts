// Libraries
import WebSocket from 'ws'

// Entities
import { InSessionClient, Session } from 'entities'

// Types
import { Sessions } from '@types'

// Constants
import { errors, serverEventNames } from '../constants'

// Utils
import { findSession, handleEventError, sendPayloadToClient } from 'utils'

export const startSession = (ws: WebSocket, sessions: Sessions, clientPayload: any) => {
  sessions.set(ws, new Session(clientPayload.maxNumberOfPlayers ?? 2, new InSessionClient(ws, clientPayload.name)))
  const id = sessions.get(ws)?.id

  const payload = {
    id,
    maxNumberOfPlayers: clientPayload.maxNumberOfPlayers
  }
  ws.emit(serverEventNames.startSession, payload)
}

export const joinSession = (ws: WebSocket, sessions: Sessions, id: string, name: string) => {
  const session = findSession(id, sessions)
  if (!session) {
    handleEventError(ws, errors.sessionNotFound)
    return
  }
  session.addPlayerToSession(new InSessionClient(ws, name))

  const payload = {
    id: session.getId(),
    players: session.getPlayers()
  }

  sendPayloadToClient(ws, payload, serverEventNames.joinSession)
}

export const closeSession = (ws: WebSocket, sessions: Sessions) => {
  const session = sessions.get(ws)
  // TODO: handle when session is not found
  if (!session) return
  if (session.clients.length <= 1) {
    sessions.delete(ws)
  }
}
