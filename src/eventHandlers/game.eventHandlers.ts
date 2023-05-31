// Entities
import { GameClient, Game } from 'entities'

// Constants
import { gameEventNames } from '../constants'

// Payloads
import { updateClientStatePayload } from 'payloads'

// Events
import {
  updateIsOnScreen,
  updateIsDrawing,
  updateIsHolding,
  endRound,
  updateIsReadyToRestart,
  endGame
} from '../events'

// Utils
import { shouldEndRound, sendPayloadToClients, isGameFinished } from 'utils'

export const handleGameEvent = (client: GameClient, game: Game, sessionId: string, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case gameEventNames.updateIsOnScreen:
      updateIsOnScreen(client, clientPayload.isOnScreen)
      break
    case gameEventNames.updateIsDrawing:
      updateIsDrawing(client, sessionId)
      break
    case gameEventNames.updateIsHolding:
      updateIsHolding(client, sessionId)
      break
    case gameEventNames.updateIsReadyToRestart:
      updateIsReadyToRestart(client, game, clientPayload.isReadyToRestart, sessionId)
      break
    default:
      return
  }

  if (shouldEndRound(game.clients)) {
    endRound(game)

    sendPayloadToClients(
      game.clients,
      (targetClient) => updateClientStatePayload(game.clients, sessionId, targetClient.webSocket === client.webSocket),
      clientPayload.eventName
    )
  }

  if (isGameFinished(game.clients)) {
    endGame(game)

    sendPayloadToClients(
      game.clients,
      (targetClient) => updateClientStatePayload(game.clients, sessionId, targetClient.webSocket === client.webSocket),
      clientPayload.eventName
    )
  }
}
