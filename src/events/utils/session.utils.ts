// Libraries
import { Player } from 'entities'

export const arePlayersReady = (players: Player[]) => {
  return players.every((player) => player.getReadyState())
}
