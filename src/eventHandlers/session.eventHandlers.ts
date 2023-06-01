// Entities
import { SessionClient, Session } from 'entities'

// Enums
import { SessionEventNames } from 'enums'

// Events
import { startGame, updateIsReady } from '../events'

export const handleSessionEvent = (client: SessionClient, session: Session, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case SessionEventNames.startGame:
      startGame(client.webSocket, session)
      break
    case SessionEventNames.updateIsReady:
      updateIsReady(client, session)
      break
    default:
      return
  }
}
