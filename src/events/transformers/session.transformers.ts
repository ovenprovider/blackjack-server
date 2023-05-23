import { Player } from 'entities'

export const updateReadyStatePayload = (players: Player[]) => {
  const transformedPlayers = players.map((player) => {
    return {
      name: player.getName(),
      id: player.getId(),
      ready: player.getReadyState()
    }
  })
}
