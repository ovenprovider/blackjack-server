// Libraries
import WebSocket from 'ws'

// Entities
import { Game, GameClient, Session, SessionClient } from 'entities'

// Constants
import { errors, sessionEventNames } from '../constants'

// Payloads
import { updateClientStatePayload, updateIsReadyPayload } from '../payloads'

// Utils
import { handleEventError, sendPayloadToClients, areClientsReady, isClientHost, sendPayloadToClient } from 'utils'

export const startGame = (ws: WebSocket, session: Session) => {
  if (session.game) {
    handleEventError(ws, errors.gameAlreadyStarted)
    return
  }

  if (!isClientHost(ws, session)) {
    handleEventError(ws, errors.clientIsNotHost)
    return
  }

  const clients = session.clients

  // This shouldn't happen since the ability to start the game will be blocked on the FE
  if (clients.length < 2) {
    handleEventError(ws, errors.notEnoughPlayers)
  }

  // In case game attempts to start and someone is not ready
  if (!areClientsReady(clients)) {
    handleEventError(ws, errors.notEveryPlayerIsReady)
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
    sessionEventNames.startGame
  )
}

export const updateIsReady = (client: SessionClient, session: Session) => {
  client.updateIsReady()

  sendPayloadToClients(
    session.clients,
    (targetClient) => updateIsReadyPayload(session.clients, session.id, targetClient.webSocket),
    sessionEventNames.updateIsReady
  )
}
