import WebSocket from "ws"
import { Card } from "./card"

export class Player {
  private hand: Card[] = []
  private readonly id: string = 'test'
  private isHolding: boolean = false
  private ws: WebSocket

  constructor(webSocket: WebSocket) {
    this.ws = webSocket
  }

  reset() {
    this.hand = []
    this.isHolding = false
  }

  setIsHolding(isHolding: boolean) {
    this.isHolding = isHolding
  }
  
  getIsHolding() {
    return this.isHolding
  }

  addCardToHand(card: Card) {
    this.hand.push(card)
  }

  getId() {
    return this.id
  }

  getHand() {
    return this.hand
  }

  getWebSocket() {
    return this.ws
  }
}