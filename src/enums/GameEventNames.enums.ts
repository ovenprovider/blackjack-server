export enum GameEventNames {
  // Client requested events
  updateIsOnScreen = 'updateIsOnScreen',
  updateIsDrawing = 'updateIsDrawing',
  updateIsReadyToRestart = 'updateIsReadyToRestart',
  updateIsHolding = 'updateIsHolding',
  // Server handled events
  initialiseHands = 'initialiseHands',
  dealCards = 'dealCards'
}
