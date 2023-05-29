// Libraries
import WebSocket from 'ws'

// Utils
import { getUuid } from 'utils'

export abstract class Client {
  readonly #id: string = getUuid()
  readonly #ws: WebSocket
  #name: string
  constructor(webSocket: WebSocket, name: string) {
    this.#ws = webSocket
    this.#name = name
  }

  get id() {
    return this.#id
  }

  get name() {
    return this.#name
  }

  get webSocket() {
    return this.#ws
  }
}
