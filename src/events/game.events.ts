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
import { shouldSkipPlayer } from './utils/game.utils'
import { updateIsHoldingPayload } from './payloads/game.payloads'

// TODO: merge update events for client properties
export const updateIsOnScreen = (ws: WebSocket, game: Game, clientIsOnScreen: boolean, sessionId: string) => {
  const client = game.clients.find((client) => {
    client.webSocket === ws
  })

  if (!client) {
    handleEventError(ws, errors.clientNotFound)
    return
  }

  client.updateIsOnScreen(clientIsOnScreen)

  sendPayloadToClients(game.clients, updateIsOnScreenPayload(game.clients, sessionId), gameEventNames.updateIsOnScreen)
}

export const initialiseHands = (game: Game) => {
  const deck = game.deck

  game.clients.forEach((client) => {
    const card = deck.drawCard()
    if (card) {
      client.addCardToHand(card)
    }
  })

  const payload = {}
  sendPayloadToClients(game.clients, payload, gameEventNames.initialiseHands)
}

export const dealCards = (game: Game) => {
  game.clients.forEach((client) => {
    if (!shouldSkipPlayer(client)) {
      const card = game.deck.drawCard()
      if (!card) {
        handleEventError(client.webSocket, errors.deckIsEmpty)
        return
      }
      client.addCardToHand(card)
    }
    game.addRound()

    sendPayloadToClients(game.clients, {}, gameEventNames.dealCards)
  })
  // TODO: properly handle scenario when the deck is empty
}

export const updateIsHolding = (ws: WebSocket, game: Game, clientIsHolding: boolean, sessionId: string) => {
  const client = game.clients.find((client) => {
    client.webSocket === ws
  })

  if (!client) {
    handleEventError(ws, errors.clientNotFound)
    return
  }

  client.updateIsHolding(clientIsHolding)

  sendPayloadToClients(game.clients, updateIsHoldingPayload(game.clients, sessionId), gameEventNames.updateIsOnScreen)
}

export const updateIsDrawing = (ws: WebSocket, game: Game, sessionId: string) => {
  const client = game.clients.find((client) => {
    client.webSocket === ws
  })

  if (!client) {
    handleEventError(ws, errors.clientNotFound)
    return
  }

  client.updateIsDrawing()

  sendPayloadToClients(game.clients, updateIsHoldingPayload(game.clients, sessionId), gameEventNames.updateIsOnScreen)
}
