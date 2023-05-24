// Entities
import { Card, InGameClient } from 'entities'

export const calculateHandValue = (hand: Card[]) => {
  return hand.reduce((accumulator, card) => {
    const cardValue = card.getValue()
    // Handle Ace card rules since it can be 1 or 11
    if (cardValue === 1 && accumulator <= 10) {
      return 11
    }
    return accumulator + cardValue
  }, 0)
}

const isBusted = (hand: Card[]) => calculateHandValue(hand) > 21

export const skipPlayer = (client: InGameClient) => {
  if (client.isHolding || isBusted(client.hand)) return true
  return false
}
