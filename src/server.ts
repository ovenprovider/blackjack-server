// Libraries
import { WebSocketServer } from 'ws'

// Types
import { ClientIdsMap, SessionsMap } from '@types'

// Events
import { closeSession, onConnect, onMessage } from './events'

export const runServer = () => {
  const sessionsMap: SessionsMap = new Map()
  const clientIdsMap: ClientIdsMap = new Map()

  // TODO: add auth
  const wss = new WebSocketServer({
    port: 8080
  })

  wss.on('connection', (ws) => {
    onConnect(ws, clientIdsMap)
    ws.on('message', (data) => onMessage(data, sessionsMap, ws))

    ws.on('error', console.error)

    ws.on('close', (data) => {
      closeSession(ws, sessionsMap)
      console.warn('closed: ', sessionsMap)
    })
  })
}
