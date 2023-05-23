// Libraries
import WebSocket from 'ws'

// Entities
import { Card } from './card'

// Utils
import { getUuid } from 'utils'

// TODO: separate into two subclasses - one for lobby and one for ingame
export class Player {
  private hand: Card[] = []
  private readonly id: string = getUuid()
  private isHolding = false
  private ws: WebSocket
  private name: string
  private readyState = false

  constructor(webSocket: WebSocket, name: string) {
    this.ws = webSocket
    this.name = name
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

  getName() {
    return this.name
  }

  getWebSocket() {
    return this.ws
  }

  getReadyState() {
    return this.readyState
  }

  setReadyState() {
    this.readyState = !this.readyState
  }
}
