import { eventNames} from "constants/eventNames.constants"
import { Session } from "entities/session"
import { joinSession, startGame, startSession } from "events/session.events"
import { WebSocket } from "ws"

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

export const handleClientEvent = (ws: WebSocket, sessions: Session[], payload: any) => {
  switch (payload.action) {
    case eventNames.startSession:
      startSession(ws, 5, sessions)
      break
    case eventNames.startGame: 
      startGame(ws, sessions, payload.id)
      break
    case eventNames.joinSession:
      joinSession(ws, sessions, payload.id)
      break
  }
}

export const closeSession = (ws: WebSocket, sessions: Session[]) => {
  const sessionToClose = sessions.findIndex((session) => {
    const players = session.getPlayers()
     if (players.length <= 1) {
      return players.find((player) => player.getWebSocket() === ws)
     }
  })

  if (sessionToClose >= 0) {
    sessions.splice(sessionToClose)
  }
}

export const sendPayloadToClient = (ws: WebSocket, payload: any, event: string) => {
  ws.emit(event, payload)
}

