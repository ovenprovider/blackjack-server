// Libraries
import { WebSocket } from 'ws'

// Entities
import { Session } from 'entities'

export type SessionsMap = Map<WebSocket, Session>
export type ClientIdsMap = Map<WebSocket, string>
