import { CommandManager, CommandInfo } from './CommandManager';
import ParsedInput from './ParsedInput';
import { ILogger, Logger } from '../lib/Logger';
import { ITerminalView } from '../views/TerminalView';
import { CommandDefinition } from './Command';

interface ITerminal {
  view: ITerminalView;
  run: () => void;
  stop: () => void;
  getInfo: (name: string) => CommandInfo | undefined;
  getAllCommandsInfo: () => Array<CommandInfo | undefined>
}

class Terminal implements ITerminal {

  public view: ITerminalView;
  private _stopToken = false;
  private commandManager = new CommandManager();
  private logger: ILogger = new Logger();
  

  constructor(view: ITerminalView, commands: CommandDefinition[]) {
    this.view = view;
    this.commandManager.register(commands, this);

    this.readAndExecute = this.readAndExecute.bind(this);
    this.handleCommandOutput = this.handleCommandOutput.bind(this);
    this.newCycle = this.newCycle.bind(this);
  }

  public use(dependency: ILogger) {
    switch (dependency.tag) {
      case 'logger':
        this.logger = dependency;
        break;
    }
    this.logger.info(`new ${dependency.tag} is set`);
  }

  private readAndExecute() : Promise<any> {

    return this.view
      .read()
      .then(input => {
        const parsedInput = ParsedInput.getFrom(input);
        return (parsedInput.command) ? this.commandManager.tryExecute(parsedInput) : Promise.resolve();
      })
  }

  private handleCommandOutput(output: any) {
    if (output instanceof Error) {
      this.view.write(output.message);
    }
  }

  private newCycle(): Promise<any> {
    return (this._stopToken)
      ? Promise.reject('exit')
      : this.readAndExecute()
        .then(this.handleCommandOutput)
        .then(this.newCycle);
  }

  private startLoop(): void {
    Promise.resolve()
      .then(this.newCycle)
      .catch(reason => {
        console.log(reason);
      });
  }

  public stop() : void {
    this._stopToken = true;
  }

  public run() : void {
    // Запускает в режиме командной строки
    this.view.write(`<b><i>Welcome!</i><b>`);
    this.startLoop();
  }

  public getInfo(command: string) : CommandInfo | undefined {
    return this.commandManager.getInfo(command);
  }
  public getAllCommandsInfo() : Array<CommandInfo | undefined> {
    const list = this.commandManager.getCommandsList();
    return list.map(name => this.commandManager.getInfo(name));
  }
}

export { ITerminal, Terminal }