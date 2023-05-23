import { Session } from 'entities'
import WebSocket from 'ws'

export type Sessions = Map<WebSocket, Session>
