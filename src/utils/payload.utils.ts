// Libraries
import { WebSocket } from 'ws'

// Entities
import { GameClient, SessionClient } from 'entities'

export const sendPayloadToClients = (
  clients: GameClient[] | SessionClient[],
  payload: (targetClient: GameClient | SessionClient) => any | any,
  event: string
) => {
  clients.forEach((client) => {
    sendPayloadToClient(client.webSocket, payload(client), event)
  })
}

export const sendPayloadToClient = (ws: WebSocket, payload: any, event: string) => {
  ws.emit(event, payload)
}
