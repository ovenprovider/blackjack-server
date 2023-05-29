// Entities
import { Deck, Game, GameClient } from 'entities'

// Constants
import { errors } from '../constants'

// Utils
import { handleEventError } from 'utils'
import { shouldEndRound, shouldSkipPlayer } from '../utils/game.utils'

const dealCards = (clients: GameClient[], deck: Deck) => {
  clients.forEach((client) => {
    if (!shouldSkipPlayer(client)) {
      const card = deck.drawCard()
      if (!card) {
        handleEventError(client.webSocket, errors.deckIsEmpty)
        return
      }
      client.addCardToHand(card)
    }
  })
  // TODO: properly handle scenario when the deck is empty
  // Although the deck would realistically not be able to reach 0 cards
}

export const updateIsOnScreen = (client: GameClient, clientIsOnScreen: boolean) => {
  client.updateIsOnScreen(clientIsOnScreen)
}

export const endRound = (game: Game) => {
  dealCards(game.clients, game.deck)
  game.clients.forEach((client) => {
    client.updateIsDrawing(false)
  })

  game.addRound()
}

export const resetGame = (game: Game) => {
  game.reset()
}

export const updateIsHolding = (client: GameClient) => {
  if (client.isHolding || client.isDrawing) {
    handleEventError(client.webSocket, errors.clientIsHolding)
    return
  }

  client.updateIsHolding(true)
}

export const updateIsDrawing = (client: GameClient) => {
  // This shouldn't happen but if it does
  if (client.isHolding) {
    handleEventError(client.webSocket, errors.clientIsHolding)
    return
  }

  client.updateIsDrawing(true)
}

export const endGame = (game: Game) => {
  // TODO: something that should not have happened, happened
  if (!shouldEndRound(game.clients)) {
    return
  }
  game.updateIsCompleted()
}
