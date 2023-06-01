// Libraries
import { WebSocketServer } from 'ws'

// Types
import { ClientIdsMap, SessionsMap } from '@types'

// Events
import { onConnect, onMessage, onClose, onError } from './events'

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
    ws.on('error', (error) => onError(error))
    ws.on('close', () => onClose(ws, clientIdsMap, sessionsMap))
  })
}
