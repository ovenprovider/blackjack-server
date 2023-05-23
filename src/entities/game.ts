import { Card } from "./card";
import { Deck } from "./deck";
import { Player } from "./player";
import { calculateHandValue, skipPlayer } from "./utils/game.utils";

export class Game {
  private deck: Deck
  private currentRound = 1
  private players: Player[]
  
  constructor (players: Player[]) {
    this.deck = new Deck()
    this.players = players
  }
  
 initiateGame() {
    this.players.forEach((player) => {
      player.reset()
      this.deck.drawCard()
      // @ts-ignore
      player.addCardToHand(this.deck.drawCard())
    })
  }

  handlePlayerActions() {
    this.players.forEach((player) => {
      if (skipPlayer(player)) return
      // @ts-ignore
      player.addCardToHand(this.deck.drawCard())
    })
  }

  completeRound() {
    this.currentRound += 1
  }

  getDeck() {
    return this.getDeck
  }
}