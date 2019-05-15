import Line from './Line';
import InputLine from './InputLine';
import InputSaver from '../lib/InputSaver';
import BaseIOEntity from '../lib/base/BaseIOEntity'
import { bind } from '../lib/util';

// class BaseTerminal {
  
// }

export default class Terminal {

  private screen: Element;
  private activeLine ?: InputLine;
  private InputSaver = new InputSaver();
  private attachedTo ?: BaseIOEntity;

  constructor(screenSelector: string) {
    const screen = document.querySelector(screenSelector);
    if (screen !== null) this.screen = screen;
    else throw new Error('invalid selector for console screen');

    this.screen.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));

    bind(this, [ this.read, this.write, this.clear ])
  }

  public attachTo(obj: BaseIOEntity) : void {
    if (this.attachedTo) this.deattach();
    obj.onread(this.read);
    obj.onwrite(this.write);
    obj.onclear(this.clear);
    this.attachedTo = obj;
  }

  public deattach() : void{
    if (this.attachedTo) {
      this.attachedTo.off('read', this.read);
      this.attachedTo.off('write', this.write);
      this.attachedTo.off('clear', this.clear);
      this.attachedTo = undefined;
    }
  }

  private read(event: any) : void {

    const line = new InputLine(event.invitation);
    this.screen.appendChild(line.element);
    this.activeLine = line;
    this.activeLine.focus();

    new Promise<string>((resolve) => {
      line.on('commit', resolve);
    })
    .then(input => {
      this.InputSaver.push(input);
      return Promise.resolve(input);
    })
    .then(input => {
      if (this.attachedTo) {
        const callback = (event.question)
          ? this.attachedTo.reply
          : this.attachedTo.in;
        callback.call(this.attachedTo, input);
      } else throw new Error('No IO entity attached!');
    });
  }
  
  private write(html: string) : void {

    const line = new Line();
    line.setContent(html);
    this.screen.appendChild(line.element);
  }

  private clear() : void {

    while (this.screen.firstChild) {
      const child = this.screen.firstChild;
      if (this.activeLine && child === this.activeLine.input) {
        break;
      }
      this.screen.removeChild(this.screen.firstChild);
    }
  }

  private handleKeys(event : KeyboardEvent) : void {

    enum Keys { UP = 38, DOWN = 40 };

    if (this.activeLine) {
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
}