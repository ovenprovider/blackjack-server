import { Card, GameClient, SessionClient } from 'entities'
import { isBusted, calculateHandValue } from './game.utils'

export const transformCard = (card: Card) => ({
  suit: card.suit,
  name: card.name
})

export const transformSessionClient = (client: SessionClient, isTargetClient: boolean) => ({
  id: isTargetClient ? client.id : '',
  name: client.name,
  isReady: client.isReady
})

export const transformGameClient = (client: GameClient, isTargetClient: boolean) => ({
  id: isTargetClient ? client.id : '',
  name: client.name,
  isHolding: isTargetClient ? client.isHolding : false,
  isDrawing: isTargetClient ? client.isDrawing : false,
  cardsToShow: client.hand.map((card, index) => {
    if (isTargetClient && index > 1) {
      transformCard(card)
    }
  }),
  numberOfCardsInHand: client.hand.length,
  handValue:
    isTargetClient || isBusted(client.hand) ? calculateHandValue(client.hand) : calculateHandValue([client.hand[0]])
})
