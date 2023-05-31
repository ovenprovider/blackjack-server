// Types
import { ValueOf } from '@types'

// Constants
import { errors, gameEventNames, serverEventNames, sessionEventNames, webSocketEventNames } from '../'

export type ErrorEventNames = ValueOf<typeof errors>
export type GameEventNames = ValueOf<typeof gameEventNames>
export type ServerEventNames = ValueOf<typeof serverEventNames>
export type SessionEventNames = ValueOf<typeof sessionEventNames>
export type WebSocketEventNames = ValueOf<typeof webSocketEventNames>
