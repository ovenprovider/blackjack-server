// Libraries
import { Session } from 'entities/session';

import { closeSession, handleClientEvent, parseJSON, sendPayloadToClient } from 'utils/server.utils';
import { validateClientEventPayloadAction, validateClientEventPayload } from 'utils/validation.utils';
import { WebSocketServer } from 'ws'

export const runServer = () => {
  const sessions: Session[] = []
  
  // TODO: add auth
  const wss = new WebSocketServer({
    port: 8080,
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

      if (validateClientEventPayloadAction(clientPayload)) {
        sendPayloadToClient(ws, {}, 'error')
        //ws.close(1007) // Unsupported payload
        ws.terminate()
      }

      handleClientEvent(ws, sessions, clientPayload)
      console.warn(sessions)
    })

    ws.on('close', (data) => {
      closeSession(ws, sessions)
      console.warn('closed: ', sessions)
    })
  })
}
