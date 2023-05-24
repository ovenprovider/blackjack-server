// Libraries
import WebSocket from 'ws'

// Utils
import { getUuid } from 'utils'

export abstract class Client {
  protected readonly _id: string = getUuid()
  protected _ws: WebSocket
  protected _name: string
  constructor(webSocket: WebSocket, name: string) {
    this._ws = webSocket
    this._name = name
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get webSocket() {
    return this._ws
  }
}
