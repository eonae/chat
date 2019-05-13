import Line from './Line';
import InputLine from './InputLine';
import CommandManager from '../CommandManager';
import CommandCollection from '../CommandCollection';
import ParsedInput from '../ParsedInput';

import { ILogger, Logger } from '../Logger';
import InputSaver from '../lib/InputSaver';

export default class Terminal {

  private screen: Element;
  private _stopToken = false;
  private activeLine: InputLine | null = null;
  private commandManager = new CommandManager();
  private logger: ILogger = new Logger();
  private InputSaver = new InputSaver();

  constructor(screenSelector: string) {
    const screen = document.querySelector(screenSelector);
    if (screen !== null) this.screen = screen;
    else throw new Error('invalid selector for console screen');

    this.screen.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));
  }

  public stop() : void {
    this._stopToken = true;
  }

  public use(dependency: ILogger) {
    switch (dependency.tag) {
      case 'logger':
        this.logger = dependency;
        break;
    }
    this.logger.info(`new ${dependency.tag} is set`);
  }

  public registerCommands(commands: CommandCollection) : void {
    this.commandManager.register(commands);
  }

  private handleKeys(event : KeyboardEvent) : void {

    enum Keys { UP = 38, DOWN = 40 };

    if (this.activeLine !== null) {
      // Input specific actions
      if (event.keyCode === Keys.UP || event.keyCode === Keys.DOWN) {
        const toDisplay = (event.keyCode === Keys.UP)
          ? this.InputSaver.getNext()
          : this.InputSaver.getPrevious();
        this.activeLine.setContent(toDisplay);
      }
    } else {

    }
  }

  private handleClick(event : Event) : void {
    if (event instanceof MouseEvent) {
      if (this.activeLine) this.activeLine.focus();
    }
  }

  public read() {

    return new Promise<string>((resolve) => {
      const line = new InputLine();
      this.screen.appendChild(line.element);
      this.activeLine = line;
      this.activeLine.focus();

      line.on('commit', resolve);
    })
    .then(input => {
      this.logger.info(input);
      this.InputSaver.push(input);
      return Promise.resolve(input);
    });
  }

  private startLoop() {
    this
      .read()
      .then(input => {
        const parsedInput = ParsedInput.getFrom(input);
        return this.commandManager.tryExecute(parsedInput);
      })
      .then(success => {
        console.log('success: ' + success);
        if (!this._stopToken) {
          this.startLoop();
        } else {
          this._stopToken = false;
        }
      });
  }

  public run() : void {
    // Запускает в режиме командной строки
    this.write(`<b><i>Welcome!</i><b>`);
    this.startLoop()

  }

  public write(html: string) : void {

    const line = new Line();
    line.setContent(html);
    this.screen.appendChild(line.element);
  }
}