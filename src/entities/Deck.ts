// Entities
import { Card } from './Card'

// Constants
import { cardNumbers, suits } from './Card/constants'

export class Deck {
  #initialDeck: Card[] = []
  #currentDeck: Card[] = []

  // TODO: move the funcitons outside
  constructor() {
    this.#initiateDeck()
    this.#shuffle()
  }

  #initiateDeck() {
    for (const suit of suits) {
      for (const [name, value] of Object.entries(cardNumbers)) {
        this.#initialDeck.push(new Card(suit, name, value))
      }
    }
  }

  drawCard() {
    return this.#currentDeck.shift()
  }

  #shuffle() {
    for (let i = 0; i < this.#initialDeck.length; i++) {
      const randomIndex = Math.floor(Math.random() * (this.#initialDeck.length - 0))
      this.#currentDeck.push(...this.#initialDeck.splice(randomIndex))
    }
  }
}
