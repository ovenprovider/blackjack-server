// Libraries
import { WebSocket } from 'ws'

// Types
import { SessionsMap } from '@types'

// Entities
import { SessionClient, GameClient, Game, Session } from 'entities'

// Constants
import { serverEventNames, sessionEventNames, gameEventNames, errors } from '../constants'

// Payloads
import { updateClientStatePayload } from 'payloads'

// Events
import {
  startSession,
  joinSession,
  closeSession,
  startGame,
  updateIsReady,
  updateIsOnScreen,
  updateIsDrawing,
  updateIsHolding,
  endRound,
  updateIsReadyToRestart
} from '../events'

// Utils
import { shouldEndRound, sendPayloadToClients } from 'utils'

export const handleServerEvents = (ws: WebSocket, sessions: SessionsMap, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case serverEventNames.startSession:
      startSession(ws, sessions, clientPayload)
      break
    case serverEventNames.joinSession:
      joinSession(ws, sessions, clientPayload.id, clientPayload.name)
      break
    case serverEventNames.closeSession:
      closeSession(ws, sessions)
      break
    default:
      return
  }
}

export const handleSessionEvent = (client: SessionClient, session: Session, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case sessionEventNames.startGame:
      startGame(client.webSocket, session)
      break
    case sessionEventNames.updateIsReady:
      updateIsReady(client, session)
      break
    default:
      return
  }
}

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
}

export const handleEventError = (ws: WebSocket, error: string) => {
  switch (error) {
    case errors.sessionNotFound:
      ws.emit('error', { error })
      break
  }
}

export const isServerEvent = (clientPayload: any) => {
  return !Object.values(sessionEventNames).includes(clientPayload.eventName)
}

export const isSessionEvent = (clientPayload: any) => {
  return !Object.values(serverEventNames).includes(clientPayload.eventName)
}

export const isGameEvent = (clientPayload: any) => {
  return !Object.values(gameEventNames).includes(clientPayload.eventName)
}
