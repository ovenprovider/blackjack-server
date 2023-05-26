// Entities
import { InGameClient } from 'entities'

const transformInGameClient = (client: InGameClient) => ({
  id: client.id,
  name: client.name,
  isOnScreen: client.isOnScreen
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
