// Libraries
import { WebSocketServer } from 'ws'
import { serverEventNames } from 'constants/serverEventNames.constants'

// Events
import { closeSession } from './events'

// Utils
import { handleSessionEvent, parseJSON, sendPayloadToClient } from 'utils/server.utils'
import { validateClientEventPayloadAction, validateClientEventPayload } from 'utils/validation.utils'

// Types
import { Sessions } from '@types'

export const runServer = () => {
  const sessions: Sessions = new Map()
  
  // TODO: add auth
  const wss = new WebSocketServer({
    port: 8080,
  })
  
  wss.on('connection', (ws) => {

    ws.on('error', console.error)
    ws.on('message', (data) => {
      const clientPayload = parseJSON(data.toString())

      // Validate data: the validation will also fail here if the JSON has failed to parse
      if(!validateClientEventPayload(data.toString())) {
        sendPayloadToClient(ws, {}, 'error')
        //ws.close(1007) // Unsupported payload
        ws.terminate()
      }

      if(validateClientEventPayloadAction(clientPayload)) {
        sendPayloadToClient(ws, {}, 'error')
        //ws.close(1007) // Unsupported payload
        ws.terminate()
      }

      if(sessions.has(ws) && clientPayload?.eventName === serverEventNames.startSession) {
        sendPayloadToClient(ws, {}, 'Session already in progress')
        ws.terminate()
      }

      // TODO: import findsession and handle session search
      const session = sessions.get(ws)
      if (session) {
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
