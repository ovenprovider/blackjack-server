// Entities
import { Client } from './Client'
import { Card } from '../Card'

export class GameClient extends Client {
  #hand: Card[] = []
  #isDrawing = false
  #isHolding = false
  #isOnScreen = false
  #isReadyToRestart = false

  get hand() {
    return this.#hand
  }

  addCardToHand(card: Card) {
    this.#hand.push(card)
  }

  get isDrawing() {
    return this.#isDrawing
  }

  updateIsDrawing(isDrawing: boolean) {
    this.#isDrawing = isDrawing
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

  get isReadyToRestart() {
    return this.#isReadyToRestart
  }

  updateIsReadyToRestart(isReadyToRestart: boolean) {
    this.#isReadyToRestart = isReadyToRestart
  }

  restart() {
    this.#hand = []
    this.#isDrawing = false
    this.#isHolding = false
    this.#isReadyToRestart = false
  }
}
