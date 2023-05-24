// Libraries
import { WebSocketServer } from 'ws'

// Events
import { closeSession } from './events'

// Utils
import {
  handleServerEvents,
  handleSessionEvent,
  parseJSON,
  sendPayloadToClient,
  validateClientEventPayload,
  isServerEvent,
  isSessionEvent
} from 'utils'

// Types
import { Sessions } from '@types'

export const runServer = () => {
  const sessions: Sessions = new Map()

  // TODO: add auth
  const wss = new WebSocketServer({
    port: 8080
  })

  wss.on('connection', (ws) => {
    ws.on('error', console.error)
    ws.on('message', (data) => {
      const clientPayload = parseJSON(data.toString())

      // Validate data: the validation will also fail here if the JSON has failed to parse
      if (!validateClientEventPayload(data.toString())) {
        sendPayloadToClient(ws, {}, 'error')
        //ws.close(1007) // Unsupported payload
        ws.terminate()
      }

      if (isServerEvent(clientPayload)) {
        handleServerEvents(ws, sessions, clientPayload)
      }

      // TODO: import findsession and handle session search
      const session = sessions.get(ws)
      if (session && isSessionEvent(clientPayload)) {
        handleSessionEvent(ws, session, clientPayload)
      }

      console.warn(sessions)
    })

    ws.on('close', (data) => {
      closeSession(ws, sessions)
      console.warn('closed: ', sessions)
    })
  })
}
