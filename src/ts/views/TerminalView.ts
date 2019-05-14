import Line from './Line';
import InputLine from './InputLine';
import InputSaver from '../lib/InputSaver';

interface ITerminalView {
  read: () => Promise<string>;
  write: (content: string) => void;
  clear: () => void;
  block: () => void;
  unblock: () => void;
}

class TerminalView implements ITerminalView {
  private screen: Element;
  private activeLine ?: InputLine;
  private InputSaver = new InputSaver();

  constructor(screenSelector: string) {
    const screen = document.querySelector(screenSelector);
    if (screen !== null) this.screen = screen;
    else throw new Error('invalid selector for console screen');

    this.screen.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));
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
      this.InputSaver.push(input);
      return Promise.resolve(input);
    });
  }
  
  public write(html: string) : void {

    const line = new Line();
    line.setContent(html);
    this.screen.appendChild(line.element);
  }

  public clear() : void {

    while (this.screen.firstChild) {
      const child = this.screen.firstChild;
      if (this.activeLine && child === this.activeLine.input) {
        break;
      }
      this.screen.removeChild(this.screen.firstChild);
    }
  }

  public block() : void {
    console.log('TerminalView.block() not implemented!')
  }

  public unblock() : void {
    console.log('TerminalView.unblock() not implemented!')
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

export { TerminalView, ITerminalView };