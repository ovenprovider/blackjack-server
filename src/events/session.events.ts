// Libraries
import WebSocket from 'ws'

// Entities
import { Session } from 'entities'

// Constants
import { errors, sessionEventNames } from '../constants'

// Utils
import { sendPayloadToClient, handleEventError } from 'utils/server.utils'

export const startGame = (ws: WebSocket, session: Session, id: string) => {
  const numberOfPlayers = session.getPlayers().length
  // This shouldn't happen since the ability to start the game will be blocked on the FE
  if (numberOfPlayers < 2) {
    handleEventError(ws, errors.notEnoughPlayers)
  }

  session.startGame()
  const payload = {
    id: session.getId()
  }

  sendPayloadToClient(ws, payload, sessionEventNames.startGame)
}
