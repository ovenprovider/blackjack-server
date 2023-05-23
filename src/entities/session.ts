import { WebSocket } from "ws"
import { Deck } from "./deck"
import { Game } from "./game"
import { Player } from "./player"

export class Session {
  private readonly numberOfPlayers: number
  private readonly id = 'test'
  private players: Player[]
  private game?: Game

  constructor(numberOfPlayers: number, player: Player) {
    this.numberOfPlayers = numberOfPlayers
    this.players = [player]
  }

  addPlayerToSession(player: Player) {
    this.players.push(player)
  }

  getId() {
    return this.id
  }

  getPlayers() {
    return this.players
  }

  startGame() {
    this.game = new Game(this.players)
  }

  removePlayerFromSession(playerId: string) {
    const playerToRemove = this.players.findIndex((player) => playerId === player.getId())
    
    if (playerToRemove >= 0) this.players.splice(playerToRemove, 1)
  }

  getGame() {
    return this.game
  }
}