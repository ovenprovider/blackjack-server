// Entities
import { InSessionClient } from 'entities'

const transformInSessionClient = (client: InSessionClient) => ({
  id: client.id,
  name: client.name,
  isReady: client.isReady
})

export const updateReadyStatePayload = (clients: InSessionClient[]) => {
  const transformedClientsData = clients.map((client) => {
    return transformInSessionClient(client)
  })

  return {
    clients: transformedClientsData
  }
}
