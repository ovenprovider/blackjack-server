// Entities
import { Client } from './Client'
import { Card } from 'entities'

export class InGameClient extends Client {
  #hand: Card[] = []
  #isDrawing = false
  #isHolding = false
  #isOnScreen = false

  get hand() {
    return this.#hand
  }

  addCardToHand(card: Card) {
    this.#hand.push(card)
  }

  get isDrawing() {
    return this.#isDrawing
  }

  updateIsDrawing() {
    this.#isDrawing
  }

  get isHolding() {
    return this.#isHolding
  }

  updateIsHolding(isHolding: boolean) {
    this.#isHolding = isHolding
  }

  get isOnScreen() {
    return this.#isOnScreen
  }

  updateIsOnScreen(isOnScreen: boolean) {
    this.#isOnScreen = isOnScreen
  }
}
