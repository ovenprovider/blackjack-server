import { Card } from "entities/card";
import { Player } from "entities/player";

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

export const skipPlayer = (player: Player) => {
  if (player.getIsHolding()|| isBusted(player.getHand())) return true
  return false
}