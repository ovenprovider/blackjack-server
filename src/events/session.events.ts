// Libraries
import WebSocket from 'ws'

// Entities
import { Session } from 'entities'

// Constants
import { errors, sessionEventNames } from '../constants'

// Utils
import { sendPayloadToClient, handleEventError } from 'utils/server.utils'
import { arePlayersReady } from './utils'

export const startGame = (ws: WebSocket, session: Session) => {
  const players = session.getPlayers()

  // This shouldn't happen since the ability to start the game will be blocked on the FE
  if (players.length < 2) {
    handleEventError(ws, errors.notEnoughPlayers)
  }

  // In case game attempts to start and someone is not ready
  if (arePlayersReady(players)) {
    handleEventError(ws, errors.notEveryPlayerIsReady)
  }

  session.startGame()
  const payload = {
    id: session.getId()
  }

  sendPayloadToClient(ws, payload, sessionEventNames.startGame)
}

export const updateReadyState = (ws: WebSocket, session: Session) => {
  const player = session.getPlayers().find((player) => player.getWebSocket() === ws)

  if (!player) {
    handleEventError(ws, 'Could not find player in session')
    return
  }

  player.setReadyState()

  if (arePlayersReady(players)) {
    const payload = {
      
    }

    sendPayloadToClient()
  }
}
