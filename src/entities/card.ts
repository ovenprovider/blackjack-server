export type Suit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spade'

export class Card {
    private suit
    private name
    private value
    
    constructor(suit: Suit, name: string, value: number) {
      this.suit = suit
      this.name = name
      this.value = value
    }

    getValue() {
      return this.value
    }
} 
