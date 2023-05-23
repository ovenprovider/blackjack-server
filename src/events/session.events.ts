import { Player } from "entities/player"
import { Session } from "entities/session"
import { sendPayloadToClient } from "utils/server.utils"
import WebSocket from "ws"
import { handleEventError } from "./error.events"
import { errors } from "../constants/error.constants"
import { findSession } from "./utils/session.utils"

export const startSession = (ws: WebSocket, maxNumberOfPlayers: number, sessions: Session[]) => {
  const session = new Session(maxNumberOfPlayers, new Player(ws))
  sessions.push(session)

  const payload = {
    id: session.getId(),
    maxNumberOfPlayers,
  }
  sendPayloadToClient(ws, payload, 'start_session')
}

export const startGame = (ws: WebSocket, sessions: Session[], id: string) => {
  const session = findSession(id, sessions)
  if (!session) {
    handleEventError(ws, errors.sessionNotFound)
    return
  }
  const numberOfPlayers = session.getPlayers().length
  // This shouldn't happen since the ability to start the game will be blocked on the FE
  if (numberOfPlayers < 2) {
    handleEventError(ws, errors.notEnoughPlayers)
  }

  session.startGame()
  const payload = {
    id: session.getId()
  }
  sendPayloadToClient(ws, payload, 'start_game')
}

export const joinSession = (ws: WebSocket, sessions: Session[], id: string) => {
  const session = findSession(id, sessions)
  if (!session) {
    handleEventError(ws, errors.sessionNotFound)
    return
  }
  session.addPlayerToSession(new Player(ws))

  const payload = {
    id: session.getId(),
    players: session.getPlayers(),

  }

  sendPayloadToClient(ws, payload, 'join_game')
}

export const endSession = (sessions: Session[]) => {
  
}