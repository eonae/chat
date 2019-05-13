import CommandCollection from "./CommandCollection";
import ParsedInput from "./ParsedInput";

export default class CommandManager {

  private _commands = new CommandCollection();

  register(commands: CommandCollection) {
    this._commands.add(commands);
  }

  tryExecute(input: ParsedInput) : Promise<boolean> {
    const cmd = this._commands.get(input.command);
    return (cmd !== undefined)
      ? cmd.exec(input.arguments, input.flags)
      : Promise.resolve<boolean>(false);
  }
}