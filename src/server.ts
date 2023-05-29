// Libraries
import { WebSocketServer } from 'ws'

// Types
import { SessionsMap } from '@types'

// Events
import { closeSession } from './events'

// Utils
import {
  handleServerEvents,
  handleSessionEvent,
  handleGameEvent,
  parseJSON,
  sendPayloadToClient,
  validateClientEventPayload,
  isServerEvent,
  isSessionEvent,
  isGameEvent,
  findSessionWithClient
} from 'utils'

export const runServer = () => {
  const sessionsMap: SessionsMap = new Map()

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
        handleServerEvents(ws, sessionsMap, clientPayload)
        return
      }

      const session = findSessionWithClient(sessionsMap, clientPayload?.sessionId, clientPayload?.clientId, ws)

      // TODO: handle these checks properly
      if (!session) {
        return
      }

      if (isSessionEvent(clientPayload)) {
        const client = session.clients.find((client) => client.webSocket === ws)
        // Should not happen since we make this check when finding the session but TS complains
        if (!client) {
          return
        }
        handleSessionEvent(client, session, clientPayload)
        return
      }

      if (isGameEvent(clientPayload)) {
        const game = session.game
        if (!game) {
          // TODO: handle error
          return
        }

        const gameClient = game.clients.find((client) => {
          client.webSocket === ws
        })

        if (!gameClient) {
          //TODO: handle error
          return
        }

        handleGameEvent(gameClient, game, session.id, clientPayload)
        return
      }

      console.warn(sessionsMap)
    })

    ws.on('close', (data) => {
      closeSession(ws, sessionsMap)
      console.warn('closed: ', sessionsMap)
    })
  })
}
