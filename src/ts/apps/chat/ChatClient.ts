import BaseIOEntity from "../../lib/base/BaseIOEntity";
import { CommandDefinition, IEventEmitter, CommandNotFoundError } from "../../lib/base/types";
import CommandTrigger from "../../lib/base/CommandTrigger";


export interface IChatService extends IEventEmitter {
  isConnected: boolean;
  tryConnect: (url: string, username: string) => Promise<void>;
  disconnect: () => void;
  send: (message: string) => boolean;
}

const Messages = {
  CONNECTED: 'Connected to server',
  CONNECTING: 'Connecting...',
  DISCONNECTED: 'Disconnected from server',
  FAILED: 'Connection failed!',
  NOT_CONNECTED: 'You are not connected to any server',
  ALREADY_CONNECTED: 'You are already connected'
}

const Events = {
  DISCONNECT: 'disconnect',

}

export default class ChatClient extends BaseIOEntity { // По идее BaseIOEnity должен быть интерфейсом, конечно
  
  private _service: IChatService;
  public readonly url: string;
  public readonly defaultProtocol: string = 'ws';

  constructor(commands: CommandDefinition[], url: string, service: IChatService) {
    super(commands);
    this._service = service;
    this.url = url;
    this.in = this.in.bind(this);

    this._service.on(Events.DISCONNECT, () => {
      this.out(Messages.DISCONNECTED);
      this.dropInvitation();
    })
  }

  public tryConnect(url: string, username: string) : Promise<void> {
    if (this._service.isConnected) {
      this.out(Messages.ALREADY_CONNECTED);
      return Promise.resolve();
    }
    
    this.out(Messages.CONNECTING);
    // this.emit('block?');
    return this._service
      .tryConnect(url, username)
      .then(() => {
        this.emit('clear', {}); // this.clear() ??
        this.out(Messages.CONNECTED);
        this.setInvitation('$');
        return;
      })
      .catch(err => {
        console.log(err);
        this.out(Messages.FAILED);
      })
  }

  public checkStatus() : void {
    const status = (this._service.isConnected)
      ? 'CONNECTED' : 'DISCONNECTED';
    this.out(`Your are currently <b>${status}</b>`);
  }

  public disconnect(): Promise<void> {
    if (this._service.isConnected) {
      this._service.disconnect();
      return Promise.resolve();
      // Сообщение в out пойдёт через событие от сервиса.
    } else {
      return Promise.reject(Messages.NOT_CONNECTED);
    }
  }

  public sendMessage(message: string) : Promise<void> {
    if (this._service.send(message)) {
      this.out(message);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(Messages.NOT_CONNECTED))
    }
  }

  public in(input: string): void {
    const trigger = CommandTrigger.getFrom(input);
    this.commandManager
      .tryExecute(trigger)
      .catch(commandError => {
        return (commandError instanceof CommandNotFoundError)
          ? this.sendMessage(input)
            .catch((/* Какая ошибка неважно */) => {
              return Promise.reject(commandError);
            })
          : Promise.reject(commandError);
      })
      .catch(error => {
        this.out(error.message);
      })
      .then(() => {
        if (!this._stopToken) {
          this.run();
        }
      });
  }
}