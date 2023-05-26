// Entities
import { InSessionClient } from 'entities'

const transformInSessionClient = (client: InSessionClient) => ({
  id: client.id,
  name: client.name,
  isReady: client.isReady
})

export const updateIsReadyPayload = (clients: InSessionClient[], sessionId: string) => {
  const transformedClientsData = clients.map((client) => {
    return transformInSessionClient(client)
  })

  return {
    sessionId,
    clients: transformedClientsData
  }
}
