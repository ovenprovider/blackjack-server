// Libraries
import { WebSocket } from 'ws'

// Entities
import { Session } from 'entities'

// Events
import { closeSession, startSession, startGame, joinSession, updateReadyState } from '../events'

// Constants
import { serverEventNames, sessionEventNames, errors } from '../constants'

// Types
import { Sessions } from '@types'

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

export const handleServerEvents = (ws: WebSocket, sessions: Sessions, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case serverEventNames.startSession:
      startSession(ws, sessions, clientPayload)
      break
    case serverEventNames.joinSession:
      joinSession(ws, sessions, clientPayload.id, clientPayload.name)
      break
    case serverEventNames.closeSession:
      closeSession(ws, sessions)
      break
  }
}

export const handleSessionEvent = (ws: WebSocket, session: Session, clientPayload: any) => {
  switch (clientPayload.eventName) {
    case sessionEventNames.startGame:
      startGame(ws, session)
      break
    case sessionEventNames.updateReadyState:
      updateReadyState(ws, session)
      break
  }
}

export const handleEventError = (ws: WebSocket, error: string) => {
  switch (error) {
    case errors.sessionNotFound:
      ws.emit('error', { error })
      break
  }
}

export const findSession = (id: string, sessions: Sessions) => {
  let sessionFound = Object.values(sessions).find((session) => session.getId() === id)
  return sessionFound
}

export const sendPayloadToClient = (ws: WebSocket, payload: any, event: string) => {
  ws.emit(event, payload)
}

export const isServerEvent = (clientPayload: any) => {
  return !Object.values(sessionEventNames).includes(clientPayload.eventName)
}

export const isSessionEvent = (clientPayload: any) => {
  return !Object.values(serverEventNames).includes(clientPayload.eventName)
}
