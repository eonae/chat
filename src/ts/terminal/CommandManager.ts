import { CommandDefinition, Command, Flag } from './Command';
import ParsedInput from './ParsedInput';
import { ITerminal } from './Terminal';

export type CommandInfo = {
  name: string;
  aliases: string[];
  info: string;
  flags: Flag[];
}

export class CommandManager {

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

  public register(definitions: CommandDefinition[], terminal: ITerminal) {
    definitions.forEach(def => {
      this.checkDef(def);
      const cmd = new Command(def, terminal);
      this._map.set(cmd.text, cmd);
      cmd.aliases.forEach(alias => this._map.set(alias, cmd));
    })
  }

  tryExecute(input: ParsedInput) : Promise<Error | void> {
    const cmd = this._map.get(input.command);
    return (cmd !== undefined)
      ? cmd.exec(input.arguments, input.flags)
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