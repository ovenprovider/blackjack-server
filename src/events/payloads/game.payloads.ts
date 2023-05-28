// Entities
import { InGameClient } from 'entities'

const transformInGameClient = (client: InGameClient) => ({
  id: client.id,
  name: client.name,
  isOnScreen: client.isOnScreen,
  isHolding: client.isHolding,
  hand: [client.hand[0]]
})

export const updateIsOnScreenPayload = (clients: InGameClient[], sessionId: string) => {
  const transformedClientsData = clients.map((client) => {
    return transformInGameClient(client)
  })

  return {
    sessionId,
    clients: transformedClientsData
  }
}

export const updateIsHoldingPayload = (clients: InGameClient[], sessionId: string) => {
  const transformedClientsData = clients.map((client) => {
    return transformInGameClient(client)
  })

  return {
    sessionId,
    clients: transformedClientsData
  }
}

export const gameStatePayload = (clients: InGameClient[], sessionId: string) => {
  const transformedClientsData = clients.map((client) => {
    return transformInGameClient(client)
  })

  return {
    sessionId,
    clients: transformedClientsData
  }
}
