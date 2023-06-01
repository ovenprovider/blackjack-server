// Types
import { Suit } from './@types'

// Enums
import { CardNumbers } from './enums'

export class Card {
  readonly #suit
  readonly #name
  readonly #value

  constructor(suit: Suit, name: string, value: CardNumbers) {
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
