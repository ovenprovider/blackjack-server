// Entities
import { Client } from './Client'
import { Card } from 'entities/Card/Card'

export class InGameClient extends Client {
  #hand: Card[] = []
  #isHolding = false
  #isOnScreen = false

  get hand() {
    return this.#hand
  }

  updateHand(card: Card) {
    this.#hand.push(card)
  }

  get isHolding() {
    return this.#isHolding
  }

  get isOnScreen() {
    return this.#isOnScreen
  }

  updateIsOnScreen(isOnScreen: boolean) {
    this.#isOnScreen = isOnScreen
  }
}
