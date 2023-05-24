// Entities
import { InSessionClient } from 'entities'

export const areClientsReady = (clients: InSessionClient[]) => {
  return clients.every((client) => client.isReady)
}
