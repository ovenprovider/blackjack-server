// Libraries
import { WebSocket } from 'ws'

// Entities
import { GameClient, SessionClient } from 'entities'

// Constants
import { webSocketEventNames } from '../constants'

export const sendPayloadToClients = (
  clients: GameClient[] | SessionClient[],
  payload: (targetClient: GameClient | SessionClient) => any | any,
  event: string
) => {
  clients.forEach((client) => {
    sendPayloadToClient(client.webSocket.emit, client.webSocket.readyState, payload(client), event)
  })
}

export const sendPayloadToClient = (
  emit: NodeJS.EventEmitter['emit'],
  webSocketReadyState: WebSocket['readyState'],
  payload: any,
  event: string
) => {
  // TODO: handle when websocket is not open, but shoudl be
  if (webSocketReadyState === WebSocket.OPEN) {
    emit(webSocketEventNames.onMessage, { ...payload, event })
  }
}
