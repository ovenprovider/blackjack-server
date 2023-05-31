// Libraries
import WebSocket from 'ws'

// Types
import { ValueOf } from '@types'
import { WebSocketEventNames } from 'constants/@types'

// Constants
import { webSocketEventNames } from '../constants'

export const handleWebSocketEvents = (ws: WebSocket, eventName: WebSocketEventNames) => {
  switch (eventName) {
    case webSocketEventNames.onError:
      console.warn('error')
      break
    case webSocketEventNames.onMessage:
      break
    case webSocketEventNames.onClose:
      break
  }
}
