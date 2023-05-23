// Libraries
import WebSocket from 'ws'

// Entities
import { Player, Session } from 'entities'

// Utils
import { findSession, handleEventError, sendPayloadToClient } from 'utils'

// Constants
import { errors, serverEventNames } from '../constants'

// Types
import { Sessions } from '@types'

export const startSession = (ws: WebSocket, sessions: Sessions, clientPayload: any) => {
  sessions.set(ws, new Session(clientPayload.maxNumberOfPlayers ?? 2, new Player(ws, clientPayload.name)))
  const id = sessions.get(ws)?.getId()

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
  session.addPlayerToSession(new Player(ws, name))

  const payload = {
    id: session.getId(),
    players: session.getPlayers()
  }

  sendPayloadToClient(ws, payload, serverEventNames.joinSession)
}

export const closeSession = (ws: WebSocket, sessions: Sessions) => {
  const session = sessions.get(ws)
  if (!session) return
  if (session.getPlayers().length <= 1) {
    sessions.delete(ws)
  }
}
