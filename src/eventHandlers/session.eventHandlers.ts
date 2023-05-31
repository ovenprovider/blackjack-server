// Entities
import { SessionClient, Session } from 'entities'

// Constants
import { sessionEventNames } from '../constants'

// Events
import { startGame, updateIsReady } from '../events'

export const handleSessionEvent = (client: SessionClient, session: Session, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case sessionEventNames.startGame:
      startGame(client.webSocket, session)
      break
    case sessionEventNames.updateIsReady:
      updateIsReady(client, session)
      break
    default:
      return
  }
}
