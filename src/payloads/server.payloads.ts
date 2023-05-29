// Entities
import { Session } from 'entities'

// Utils
import { transformSessionClient } from 'utils'

export const joinSessionPayload = (session: Session, isTargetClient: boolean) => {
  return {
    sessionId: session.id,
    clients: session.clients.map((client) => transformSessionClient(client, isTargetClient))
  }
}

export const startSessionPayload = (sessionId: string, maxNumberOfPlayers: number) => {
  return {
    sessionId,
    maxNumberOfPlayers
  }
}
