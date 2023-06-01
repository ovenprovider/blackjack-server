// Libraries
import WebSocket from 'ws'

// Types
import { ClientIdsMap, SessionsMap } from '@types'

// Event Handler
import { handleServerEvent, handleSessionEvent, handleGameEvent } from 'eventHandlers'

// Payloads
import { onConnectPayload } from 'payloads'

// Utils
import {
  parseJSON,
  sendPayloadToClient,
  isServerEvent,
  isSessionEvent,
  isGameEvent,
  findSessionWithClient,
  getUuid
} from 'utils'
import { serverSchema } from 'schema'

export const onMessage = (data: WebSocket.RawData, sessionsMap: SessionsMap, ws: WebSocket) => {
  const clientPayload = parseJSON(data.toString())
  const validatedPayload = serverSchema.parse(clientPayload)
  // Validate data: the validation will also fail here if the JSON has failed to parse
  if (!validatedPayload) {
    sendPayloadToClient(ws.emit, ws.readyState, {}, 'error')
    //ws.close(1007) // Unsupported payload
    ws.terminate()
    return
  }

  if (isServerEvent(validatedPayload.eventName)) {
    handleServerEvent(ws, sessionsMap, clientPayload)
    return
  }

  const session = findSessionWithClient(sessionsMap, clientPayload?.sessionId, clientPayload?.clientId, ws)

  // TODO: handle these checks properly
  if (!session) {
    return
  }

  if (isSessionEvent(clientPayload)) {
    const client = session.clients.find((client) => client.webSocket === ws)
    // Should not happen since we make this check when finding the session but TS complains
    if (!client) {
      return
    }

    handleSessionEvent(client, session, clientPayload)
    return
  }

  if (isGameEvent(clientPayload)) {
    const game = session.game
    if (!game) {
      // Game has not started
      return
    }

    const gameClient = game.clients.find((client) => {
      client.webSocket === ws
    })

    if (!gameClient) {
      // Client is not in the game, although this condition is checked against the
      // the reference, it needs to be changed if we want to handle reconnects
      return
    }

    handleGameEvent(gameClient, game, session.id, clientPayload)
    return
  }

  console.warn(sessionsMap)
}

export const onConnect = (ws: WebSocket, clientIdsMap: ClientIdsMap) => {
  const existingUuid = clientIdsMap.get(ws)
  const uuid = existingUuid ?? getUuid()
  existingUuid ?? clientIdsMap.set(ws, uuid)

  sendPayloadToClient(ws.emit, ws.readyState, onConnectPayload(uuid), 'onConnect')
}

export const onClose = (ws: WebSocket, clientIdsMap: ClientIdsMap, sessionsMap: SessionsMap) => {
  clientIdsMap.delete(ws)
  const session = sessionsMap.get(ws)

  if (!session) return
  if (session.clients.length <= 1) {
    sessionsMap.delete(ws)
  }
}

export const onError = (error: Error) => {
  // TODO: error handler
  return
}
