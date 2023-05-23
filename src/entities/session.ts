// Libraries
import { WebSocket } from 'ws'

// Entities
import { Game } from './game'
import { Player } from './player'

// Utils
import { getUuid } from 'utils'

export class Session {
  private readonly maxNumberOfPlayers: number
  private readonly id = getUuid()
  private players: Player[]
  private game?: Game

  constructor(maxNumberOfPlayers: number, player: Player) {
    this.maxNumberOfPlayers = maxNumberOfPlayers
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

  getGame() {
    return this.game
  }

  getMaxNumberOfPlayers() {
    return this.maxNumberOfPlayers
  }
}
