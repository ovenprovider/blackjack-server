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

export const updateIsReadyToRestartPayload = (clients: GameClient[], sessionId: string, isTargetClient: boolean) => {
  const clientsData = clients.map((client) => ({
    clientId: isTargetClient ? client.id : '',
    isReadyToRestart: client.isReadyToRestart
  }))

  return {
    sessionId,
    clients: clientsData
  }
}

export const updateClientPayload = (client: GameClient, sessionId: string, property: 'isDrawing' | 'isHolding') => {
  return {
    sessionId,
    clients: [
      {
        clientId: client.id,
        [property]: client[property]
      }
    ]
  }
}
