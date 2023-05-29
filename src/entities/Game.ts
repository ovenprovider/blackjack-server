// Entities
import { Deck } from './Deck'
import { GameClient } from './Client'

export class Game {
  #deck: Deck
  #currentRound = 1
  #numberOfGamesCompleted = 0
  #clients: GameClient[]
  #isCompleted = false
  constructor(clients: GameClient[]) {
    this.#deck = new Deck()
    this.#clients = clients
  }

  addRound() {
    this.#currentRound += 1
  }

  reset() {
    this.#deck = new Deck()
    this.#clients.forEach((client) => client.reset())
    this.#currentRound = 1
    this.#numberOfGamesCompleted += 1
    this.#isCompleted = false
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

  get numberOfGamesCompleted() {
    return this.#numberOfGamesCompleted
  }

  get isCompleted() {
    return this.#isCompleted
  }

  updateIsCompleted() {
    this.#isCompleted = true
  }
}
