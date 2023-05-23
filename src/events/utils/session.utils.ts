
import { Session } from "entities/session"
import WebSocket from "ws"

export const findSession = (id: string, sessions: Session[]) => 
  sessions.find((session) => session.getId() === id)

export const removePlayer = (ws: WebSocket, sessions: Session[]) => {

}