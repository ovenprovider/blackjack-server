// Libraries
import { WebSocket } from 'ws'

// Entities
import { Game } from 'entities'

// Constants
import { errors, gameEventNames } from '../constants'

// Payloads
import { updateIsOnScreenPayload } from './payloads'

// Utils
import { handleEventError, sendPayloadToClients } from 'utils'

export const updateIsOnScreen = (ws: WebSocket, game: Game, clientIsOnScreen: boolean, sessionId: string) => {
  const client = game.clients.find((client) => {
    client.webSocket === ws
  })

  if (!client) {
    handleEventError(ws, errors.clientNotFound)
  }
  client?.updateIsOnScreen(clientIsOnScreen)

  sendPayloadToClients(game.clients, updateIsOnScreenPayload(game.clients, sessionId), gameEventNames.updateIsOnScreen)
}

export const initialiseHands = (game: Game) => {
  const deck = game.deck

  game.clients.forEach((client) => {
    const card = deck.drawCard()
    if (card) {
      client.updateHand(card)
    }
  })

  const payload = {}
  sendPayloadToClients(game.clients, payload, gameEventNames.initialiseHands)
}
