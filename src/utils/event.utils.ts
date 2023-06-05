// Libraries
import { WebSocket } from 'ws'

// Enums
import { ServerEventNames, SessionEventNames, GameEventNames, Errors } from 'enums'

export const handleEventError = (ws: WebSocket, error: string) => {
  switch (error) {
    case Errors.sessionNotFound:
      ws.emit('error', { error })
      break
  }
}

export const isOfEventType = (
  eventNames: typeof ServerEventNames | typeof SessionEventNames | typeof GameEventNames,
  eventName: string
) => {
  return !Object.values(eventNames).includes(eventName)
}
