// Entities
import { Deck, Game, GameClient } from 'entities'

// Enums
import { Errors, GameEventNames } from 'enums'

// Payloads
import { updateClientPayload, updateClientStatePayload, updateIsReadyToRestartPayload } from 'payloads'

// Utils
import {
  handleEventError,
  sendPayloadToClient,
  sendPayloadToClients,
  shouldEndRound,
  shouldRestartGame,
  shouldSkipPlayer
} from 'utils'

const dealCards = (clients: GameClient[], deck: Deck) => {
  clients.forEach((client) => {
    if (!shouldSkipPlayer(client)) {
      const card = deck.drawCard()
      if (!card) {
        handleEventError(client.webSocket, Errors.deckIsEmpty)
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

export const updateIsHolding = (client: GameClient, sessionId: string) => {
  if (client.isHolding || client.isDrawing) {
    handleEventError(client.webSocket, Errors.clientIsHolding)
    return
  }

  client.updateIsHolding(true)

  sendPayloadToClient(
    client.webSocket.emit,
    client.webSocket.readyState,
    updateClientPayload(client, sessionId, 'isHolding'),
    GameEventNames.updateIsHolding
  )
}

export const updateIsDrawing = (client: GameClient, sessionId: string) => {
  // This shouldn't happen but if it does
  if (client.isHolding) {
    handleEventError(client.webSocket, Errors.clientIsHolding)
    return
  }

  client.updateIsDrawing(true)

  sendPayloadToClient(
    client.webSocket.emit,
    client.webSocket.readyState,
    updateClientPayload(client, sessionId, 'isDrawing'),
    GameEventNames.updateIsDrawing
  )
}

export const endGame = (game: Game) => {
  // something that should not have happened, happened
  if (!shouldEndRound(game.clients)) {
    return
  }

  game.updateIsFinished()
}

export const updateIsReadyToRestart = (
  client: GameClient,
  game: Game,
  isReadyToRestart: boolean,
  sessionId: string
) => {
  if (!game.isFinished) {
    handleEventError(client.webSocket, Errors.gameIsNotFinished)
    return
  }

  client.updateIsReadyToRestart(isReadyToRestart)

  sendPayloadToClients(
    game.clients,
    (targetClient) =>
      updateIsReadyToRestartPayload(game.clients, sessionId, targetClient.webSocket === client.webSocket),
    GameEventNames.updateIsReadyToRestart
  )

  if (shouldRestartGame(game.clients)) {
    game.restart()

    sendPayloadToClients(
      game.clients,
      (targetClient) => updateClientStatePayload(game.clients, sessionId, targetClient.webSocket === client.webSocket),
      GameEventNames.dealCards
    )
  }
}
