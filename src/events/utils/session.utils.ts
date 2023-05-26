// Libraries
import { WebSocket } from 'ws'

// Entities
import { InSessionClient, Session } from 'entities'

export const areClientsReady = (clients: InSessionClient[]) => {
  return clients.every((client) => client.isReady)
}

export const isClientHost = (ws: WebSocket, session: Session) => {
  return session.host.webSocket === ws
}
