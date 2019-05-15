import BaseIOEntity from "../../lib/base/BaseIOEntity";
import { CommandDefinition } from "../../lib/base/types";
import CommandTrigger from "../../lib/base/CommandTrigger";
import { isError } from "../../lib/util";


export default class ChatClient extends BaseIOEntity { // По идее BaseIOEnity должен быть интерфейсом, конечно
  
  private _socket: WebSocket | undefined;
  public readonly url: string;

  public get socket(): WebSocket | undefined {
    return this._socket;
  }
  public connect(socket: WebSocket): void {
    this._socket = socket;
  }
  public disconnect(): void {
    this._socket = undefined;
  }

  constructor(commands: CommandDefinition[], url: string) {
    super(commands);
    this.url = url;
    this.in = this.in.bind(this);
    this.reportErrors = this.reportErrors.bind(this);
  }

  private reportErrors(output: any) : Promise<any> {
    if (isError(output)) {
      this.emit('write', output.message);
    }
    return Promise.resolve(output);
  }

  private _messageTrigger(message: string) : CommandTrigger {
    return {
      command: '@message',
      flags: [],
      arguments: [ message ]
    }
  }

  public in(input: string): void {
    const trigger = CommandTrigger.getFrom(input);
    let error: Error | void; // Не знаю, как сделать по-другому. Надо разбираться
    this.commandManager
      .tryExecute(trigger)
      .then(output => {
        if (isError(output)) {
          error = output;
          return this.commandManager
            .tryExecute(this._messageTrigger(input))
            .then(output => {
              const res = (isError(output)) ? error : undefined; // Это важно! Причина по которой не получилось отправить сообщение
              // Может быть только одна - соединение закрыто, а значит нужно отобразить именно ошибку КОМАНДЫ!
              return Promise.resolve(res);
            });
        } else {
          return Promise.resolve(error);
        }
      })
      .then(this.reportErrors)
      .then(() => {
        if (!this._stopToken) {
          this.run();
        }
      });
  }
}