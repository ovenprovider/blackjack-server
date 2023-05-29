// Libraries
import { WebSocket } from 'ws'

// Entities
import { SessionClient, Session } from 'entities'

// Types
import { SessionsMap } from '@types'

export const parseJSON = (data: string) => {
  try {
    return JSON.parse(data)
  } catch (e) {
    console.error('failed to parse json')
    return {
      error: 'Invalid payload'
    }
  }
}

export const findSession = (sessionsMap: SessionsMap, sessionId: string) => {
  const sessions: Session[] = Object.values(sessionsMap)
  const session = sessions.find((session) => session.id === sessionId)
  return session
}

// For updating session state
export const findSessionWithClient = (sessionsMap: SessionsMap, sessionId: string, clientId: string, ws: WebSocket) => {
  const sessions: Session[] = Object.values(sessionsMap)
  const session = sessions.find(
    (session) => session.id === sessionId && isClientInSession(ws, clientId, session.clients)
  )
  return session
}

export const isClientInSession = (ws: WebSocket, clientId: string, clients: SessionClient[]) => {
  return !!clients.find((client) => client.webSocket === ws && client.id === clientId)
}
