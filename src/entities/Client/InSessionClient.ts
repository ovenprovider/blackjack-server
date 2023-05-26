// Entities
import { Client } from './Client'

export class InSessionClient extends Client {
  #isReady = false

  get isReady() {
    return this.#isReady
  }

  updateIsReady() {
    this.#isReady = !this.#isReady
  }
}