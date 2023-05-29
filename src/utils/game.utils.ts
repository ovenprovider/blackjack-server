// Entities
import { Card, GameClient } from 'entities'

export const calculateHandValue = (hand: Card[]) => {
  return hand.reduce((accumulator, card) => {
    const cardValue = card.value
    // Handle Ace card rules since it can be 1 or 11
    if (cardValue === 1 && accumulator <= 10) {
      return 11
    }
    return accumulator + cardValue
  }, 0)
}

export const isBusted = (hand: Card[]) => calculateHandValue(hand) > 21

export const shouldSkipPlayer = (client: GameClient) => {
  if (client.isHolding || isBusted(client.hand)) return true
  return false
}

export const shouldEndRound = (clients: GameClient[]) => {
  return clients.every((client) => shouldSkipPlayer(client) || client.isDrawing)
}

export const isGameCompleted = (clients: GameClient[]) => {
  return clients.every((client) => shouldSkipPlayer(client))
}

export const shouldRestartGame = (clients: GameClient[]) => {
  return clients.every((client) => client.isReadyToRestart)
}
