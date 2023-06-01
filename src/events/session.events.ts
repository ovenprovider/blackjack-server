// Libraries
import WebSocket from 'ws'

// Entities
import { Game, GameClient, Session, SessionClient } from 'entities'

// Enums
import { Errors, SessionEventNames } from 'enums'

// Payloads
import { updateClientStatePayload, updateIsReadyPayload } from 'payloads'

// Utils
import { handleEventError, sendPayloadToClients, areClientsReady, isClientHost } from 'utils'

export const startGame = (ws: WebSocket, session: Session) => {
  if (session.game) {
    handleEventError(ws, Errors.gameAlreadyStarted)
    return
  }

  if (!isClientHost(ws, session)) {
    handleEventError(ws, Errors.clientIsNotHost)
    return
  }

  const clients = session.clients

  // This shouldn't happen since the ability to start the game will be blocked on the FE
  if (clients.length < 2) {
    handleEventError(ws, Errors.notEnoughPlayers)
  }

  // In case game attempts to start and someone is not ready
  if (!areClientsReady(clients)) {
    handleEventError(ws, Errors.notEveryPlayerIsReady)
  }

  const gameClients = clients.map((sessionClient) => new GameClient(sessionClient.webSocket, sessionClient.name))

  const game = new Game(gameClients)

  game.clients.forEach((client) => {
    const card = game.deck.drawCard()
    if (card) {
      client.addCardToHand(card)
    }
  })

  session.initialiseGame(game)
  // TODO: clean this chunk up

  sendPayloadToClients(
    game.clients,
    (targetClient) => updateClientStatePayload(game.clients, session.id, targetClient.webSocket === ws),
    SessionEventNames.startGame
  )
}

export const updateIsReady = (client: SessionClient, session: Session) => {
  client.updateIsReady()

  sendPayloadToClients(
    session.clients,
    (targetClient) => updateIsReadyPayload(session.clients, session.id, targetClient.webSocket),
    SessionEventNames.updateIsReady
  )
}
