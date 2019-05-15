import CommandTrigger from '../../lib/base/CommandTrigger';
import { ILogger, Logger } from '../../lib/Logger';
import BaseIOEntity from '../../lib/base/BaseIOEntity';
import { CommandDefinition } from '../../lib/base/types';

export default class CommandShell extends BaseIOEntity {

  private logger: ILogger = new Logger();

  constructor(commands: CommandDefinition[]) {
    super(commands);
    this.reportErrors = this.reportErrors.bind(this);
    this.in = this.in.bind(this); // Интересно, как в конструкторе абстрактного класса биндится абстрактный метод?
  }

  public use(dependency: ILogger) {
    switch (dependency.tag) {
      case 'logger':
        this.logger = dependency;
        break;
    }
    this.logger.info(`new ${dependency.tag} is set`);
  }

  private reportErrors(output: any) : void{
    if (output instanceof Error) {
      this.emit('write', output.message);
    }
  }

  public in(input: string): void {
    const trigger = CommandTrigger.getFrom(input);
    this.commandManager
      .tryExecute(trigger)
      .then(this.reportErrors)
      .then(() => {
        if (!this._stopToken) {
          this.emit('read', {});
        }
      });
  }

  public run(): void {
    this.emit('read', {});
  }
}