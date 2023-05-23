// Entities
import { Deck } from "./deck";
import { Player } from "./player";

export class Game {
  private deck: Deck
  private currentRound = 1
  private players: Player[]
  
  constructor (players: Player[]) {
    this.deck = new Deck()
    this.players = players
  }

  addRound() {
    this.currentRound += 1
  }

  getPlayers() {
    return this.players
  }

  getCurrentRound() {
    return this.currentRound
  }

  getDeck() {
    return this.deck
  }
}