// Libraries
import WebSocket from 'ws'

// Entities
import { Session } from 'entities'

// Constants
import { errors, sessionEventNames } from '../constants'

// Utils
import { sendPayloadToClient, handleEventError } from 'utils/'
import { areClientsReady } from 'events/utils'

export const startGame = (ws: WebSocket, session: Session) => {
  const clients = session.clients

  // This shouldn't happen since the ability to start the game will be blocked on the FE
  if (clients.length < 2) {
    handleEventError(ws, errors.notEnoughPlayers)
  }

  // In case game attempts to start and someone is not ready
  if (!areClientsReady(clients)) {
    handleEventError(ws, errors.notEveryPlayerIsReady)
  }

  session.initialiseGame()
  const payload = {
    id: session.id
  }

  sendPayloadToClient(ws, payload, sessionEventNames.startGame)
}

export const updateReadyState = (ws: WebSocket, session: Session) => {
  const client = session.clients.find((client) => client.webSocket === ws)

  if (!client) {
    handleEventError(ws, 'Could not find player in session')
    return
  }

  client.updateIsReady()

  const clients = session.clients
  if (areClientsReady(session.clients)) {
    const payload = {
      players: clients
    }

    sendPayloadToClient(ws, payload, sessionEventNames.updateReadyState)
  }
}
