// Entities
import { Deck } from './Deck'
import { InGameClient } from './Client'

export class Game {
  #deck: Deck
  #currentRound = 1
  #clients: InGameClient[]

  constructor(clients: InGameClient[]) {
    this.#deck = new Deck()
    this.#clients = clients
  }

  addRound() {
    this.#currentRound += 1
  }

  get clients() {
    return this.#clients
  }

  get currentRound() {
    return this.#currentRound
  }

  get deck() {
    return this.#deck
  }
}
