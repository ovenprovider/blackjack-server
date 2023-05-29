// Entities
import { GameClient } from 'entities'

// Utils
import { transformGameClient } from 'utils'

export const updateClientStatePayload = (clients: GameClient[], sessionId: string, isTargetClient: boolean) => {
  const transformedClientsData = clients.map((client) => {
    return transformGameClient(client, isTargetClient)
  })

  return {
    sessionId,
    clients: transformedClientsData
  }
}
