// Libraries
import { WebSocket } from 'ws'

// Entities
import { SessionClient, Session } from 'entities'

export const areClientsReady = (clients: SessionClient[]) => {
  return clients.every((client) => client.isReady)
}

export const isClientHost = (ws: WebSocket, session: Session) => {
  return session.host.webSocket === ws
}
