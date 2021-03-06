import EventEmitter from '../EventEmitter';
import CommandManager from './CommandManager';
import { CommandInfo, CommandDefinition, BaseIOCallback } from './types';
import CommandTrigger from './CommandTrigger';

export default abstract class BaseIOEntity extends EventEmitter {

  public abstract in(input: string) : void;
  public defaultInvitation: string = '>';
  public invitation: string = this.defaultInvitation;

  public setInvitation(inv: string) : void {
    this.invitation = inv;
  }
  public dropInvitation() {
    this.invitation = this.defaultInvitation;
  }
  
  run() : void { // Вообще, этот метод специфичен для Shell-подобных сущностей. Может быть
    // стоит сделать ещё один уровень абстракции.
    this.emit('read', { invitation: this.invitation });
  }

  protected commandManager = new CommandManager();
  protected _stopToken = false;

  constructor(commands: CommandDefinition[]) {
    super();
    this.commandManager.register(commands, this);
    this.in = this.in.bind(this);
  }

  public getInfo(command: string) : CommandInfo | undefined {
    return this.commandManager.getInfo(command);
  }
  public getAllCommandsInfo() : Array<CommandInfo | undefined> {
    const list = this.commandManager.getCommandsList();
    return list.map(name => this.commandManager.getInfo(name));
  }
  public executeCommand(trigger: CommandTrigger) {
    // Надо переименовать класс CommandTrigger во что-то другое..
    return this.commandManager.tryExecute(trigger)
  }

  public stop(): void {
    this._stopToken = true;
  }

  public onread(callback: BaseIOCallback) : void {
    this.on('read', callback);
  }

  public onwrite(callback: BaseIOCallback) : void {
    this.on('write', callback);
  }

  public onclear(callback: BaseIOCallback) : void {
    this.on('clear', callback);
  }

  protected out(message: string): void {
    this.emit('write', message);
  }

  public ask(invitation: string) : Promise<string> {
    this.emit('read', { invitation, question: true });

    return new Promise(resolve => {
      this.on('reply', answer => {
        resolve(answer);
      })
    });
  }

  public reply(answer: string) : void {
    this.emit('reply', answer);
  }
}