// Libraries
import WebSocket from 'ws'

// Types
import { ClientIdsMap, SessionsMap } from '@types'

// Event Handler
import { handleServerEvent, handleSessionEvent, handleGameEvent } from '../eventHandlers'

// Utils
import {
  parseJSON,
  sendPayloadToClient,
  validateClientEventPayload,
  isServerEvent,
  isSessionEvent,
  isGameEvent,
  findSessionWithClient,
  getUuid
} from 'utils'
import { onConnectPayload } from 'payloads'

export const onMessage = (data: WebSocket.RawData, sessionsMap: SessionsMap, ws: WebSocket) => {
  const clientPayload = parseJSON(data.toString())

  // Validate data: the validation will also fail here if the JSON has failed to parse
  if (!validateClientEventPayload(data.toString())) {
    sendPayloadToClient(ws.emit, ws.readyState, {}, 'error')
    //ws.close(1007) // Unsupported payload
    ws.terminate()
    return
  }

  if (isServerEvent(clientPayload)) {
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
      // TODO: handle error
      return
    }

    const gameClient = game.clients.find((client) => {
      client.webSocket === ws
    })

    if (!gameClient) {
      //TODO: handle error
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
