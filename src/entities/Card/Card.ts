// Types
import { Suit } from './@types'

export class Card {
  #suit
  #name
  #value

  constructor(suit: Suit, name: string, value: number) {
    this.#suit = suit
    this.#name = name
    this.#value = value
  }

  get suit() {
    return this.#suit
  }

  get name() {
    return this.#name
  }

  get value() {
    return this.#value
  }
}
