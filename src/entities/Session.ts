// Entities
import { Game } from './Game'
import { InGameClient, InSessionClient } from './Client'

// Utils
import { getUuid } from 'utils'

export class Session {
  readonly #maxNumberOfPlayers: number
  readonly #id = getUuid()
  #clients: InSessionClient[]
  #host: InSessionClient
  #game: Game | undefined

  constructor(maxNumberOfPlayers: number, client: InSessionClient) {
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

  get host() {
    return this.#host
  }

  initialiseGame() {
    const inGameClients = this.#clients.map(
      (inSessionClient) => new InGameClient(inSessionClient.webSocket, inSessionClient.name)
    )

    this.#game = new Game(inGameClients)
  }

  get game() {
    return this.#game
  }

  get maxNumberOfPlayers() {
    return this.#maxNumberOfPlayers
  }
}