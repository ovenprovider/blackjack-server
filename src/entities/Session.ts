// Entities
import { Game } from './Game'
import { SessionClient } from './Client'

// Utils
import { getUuid } from 'utils'

export class Session {
  readonly #maxNumberOfPlayers: number
  readonly #id = getUuid()
  #clients: SessionClient[]
  #host: SessionClient
  #game: Game | undefined

  constructor(maxNumberOfPlayers: number, client: SessionClient) {
    this.#maxNumberOfPlayers = maxNumberOfPlayers
    this.#clients = [client]
    this.#host = client
  }

  get id() {
    return this.#id
  }

  get clients() {
    return this.#clients
  }

  addClient(client: SessionClient) {
    this.#clients.push(client)
  }

  get host() {
    return this.#host
  }

  initialiseGame(game: Game) {
    this.#game = game
  }

  get game() {
    return this.#game
  }

  get maxNumberOfPlayers() {
    return this.#maxNumberOfPlayers
  }
}
