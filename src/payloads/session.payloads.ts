// Libraries
import { WebSocket } from 'ws'

// Entities
import { GameClient, SessionClient } from 'entities'

// Utils
import { transformSessionClient, transformGameClient } from 'utils'

export const updateIsReadyPayload = (clients: SessionClient[], sessionId: string, targetClient: WebSocket) => {
  const transformedClientsData = clients.map((client) => {
    return transformSessionClient(client, client.webSocket === targetClient)
  })

  return {
    sessionId,
    clients: transformedClientsData
  }
}

export const startGamePayload = (clients: GameClient[], sessionId: string, targetClient: WebSocket) => {
  const transformedGameClientsData = clients.map((client) =>
    transformGameClient(client, client.webSocket === targetClient)
  )

  return {
    sessionId,
    transformedGameClientsData
  }
}
