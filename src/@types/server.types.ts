// Libraries
import WebSocket from 'ws'

// Entities
import { Session } from 'entities'

export type Sessions = Map<WebSocket, Session>
