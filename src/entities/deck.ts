import { Card } from "./card"
import { cardNumbers, suits } from "./constants/cards.constants"

export class Deck {
    private initialDeck: Card[] = []
    private currentDeck: Card[] = []
  
    constructor() {
      this.initiateDeck()
      this.shuffle()
    }

    initiateDeck() {
      for (const suit of suits) {
        for (const [name, value] of Object.entries(cardNumbers)) {
          this.initialDeck.push(new Card(suit, name, value))
        }
      }
    }

    drawCard() {
      return this.currentDeck.shift()
    }
    
    shuffle() {
      for (let i = 0; i < this.initialDeck.length; i++) {
        const randomIndex = Math.floor(Math.random() * (this.initialDeck.length - 0))
        this.currentDeck.push(...this.initialDeck.splice(randomIndex))
      }
    }
} 
