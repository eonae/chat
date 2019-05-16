import EventEmitter from "../../lib/EventEmitter";
import { IChatService } from './ChatClient'; 

export default class WebSocketService extends EventEmitter implements IChatService {

  public _socket: WebSocket | null = null;

  public tryConnect(url: string, username: string) : Promise<void> {
    console.log({ url, username });

    return new Promise<void>((resolve, reject) => {
      const socket = new WebSocket(url);
      socket.onopen = () => {
        this._socket = socket;
        resolve();
      };
      socket.onclose = () => {
        this.emit('disconnect', {});
        this._socket = null;
        reject();
      };
      socket.onmessage = event => {
        this.emit('message', event.data);
      };
    });
  }
  public disconnect() : void {
    if (!this._socket) return;
    this._socket.close();
    this._socket = null;
  }
  public get isConnected() : boolean {
    return this._socket !== null;
  }

  public send(message: string) {
    if (!this._socket) return false;
    this._socket.send(message);
    return true;
  }
}
          