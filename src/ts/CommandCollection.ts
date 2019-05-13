import Command from "./Command";

type CommandDefinition = {
  text: string,
  aliases: string | string[];
  action: (params: string[], flags: string[]) => void;
  validation: (params: string[], flags: string[]) => boolean;
}

export default class CommandCollection {
  private _commands: Map<string, Command> = new Map();
  public get commandNames() : IterableIterator<string> {
    return this._commands.keys();
  }

  add(arg: CommandDefinition | Command | CommandCollection) : void {

    if (arg instanceof Command) {
      this._commands.set(arg.text, arg);
    } else if (arg instanceof CommandCollection) {
      for (let cmdName of arg.commandNames) {
        const cmd = arg.get(cmdName);
        if (!this._commands.has(cmdName) && cmd) {
          this._commands.set(cmdName, cmd);
        }
      }
    } else {
      const cmd = new Command(arg.text, arg.action, arg.validation);
      cmd.setAlias(arg.aliases);
      this._commands.set(cmd.text, cmd);
    }
  }

  get(cmdName: string): Command | undefined {
    return this._commands.get(cmdName);
  }

}