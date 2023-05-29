// Entities
import { Deck } from './Deck'
import { GameClient } from './Client'

export class Game {
  #deck: Deck
  #currentRound = 1
  #numberOfGamesCompleted = 0
  #clients: GameClient[]
  #isFinished = false
  constructor(clients: GameClient[]) {
    this.#deck = new Deck()
    this.#clients = clients
  }

  addRound() {
    this.#currentRound += 1
  }

  restart() {
    this.#deck = new Deck()
    this.#clients.forEach((client) => client.restart())
    this.#currentRound = 1
    this.#numberOfGamesCompleted += 1
    this.#isFinished = false
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

  get isFinished() {
    return this.#isFinished
  }

  updateIsFinished() {
    this.#isFinished = true
  }
}
