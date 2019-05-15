import Command from './Command';
import CommandTrigger from './CommandTrigger';
import BaseIOEntity from './BaseIOEntity';
import { CommandInfo, CommandDefinition } from './types';

export default class CommandManager {

  private _map = new Map<string, Command>();

  public getInfo(commandName: string) : CommandInfo | undefined {
      
    const cmd = this._map.get(commandName);
    return (cmd)
      ? {
        name: cmd.text,
        aliases: cmd.aliases,
        info: cmd.info,
        flags: cmd.flags
      }
      : undefined;
  }

  public getCommandsList() : string[] {
    return Array
      .from(this._map.values())
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(command => command.text);
  }

  public register(definitions: CommandDefinition[], terminal: BaseIOEntity) {
    definitions.forEach(def => {
      this.checkDef(def);
      const cmd = new Command(def, terminal);
      this._map.set(cmd.text, cmd);
      cmd.aliases.forEach(alias => this._map.set(alias, cmd));
    })
  }

  tryExecute(trigger: CommandTrigger) : Promise<Error | void> {
    const cmd = this._map.get(trigger.command);
    return (cmd !== undefined)
      ? cmd.exec(trigger.arguments, trigger.flags)
      : Promise.resolve(new Error('Command not found'));
  }

  private checkDef(def: CommandDefinition) : void {
    if (this._map.has(def.text)) {
      throw new Error(`Command ${def.text} already registered!`);
    }
    if (def.aliases) {
      for (let alias of def.aliases) {
        if (this._map.has(alias)) {
          throw new Error(`Alias ${alias} is already registered!`);
        }
      }
    }
  }
}