// Entities
import { Client } from './Client'
import { Card } from 'entities/Card/Card'

export class InGameClient extends Client {
  #hand: Card[] = []
  #isHolding = false

  get hand() {
    return this.#hand
  }

  get isHolding() {
    return this.#isHolding
  }
}
