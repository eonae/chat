import Line from './Line';
import InputLine from './InputLine';
import InputSaver from '../lib/InputSaver';
import BaseIOEntity from '../lib/base/BaseIOEntity'
import { bind, removeAllChildren } from '../lib/util';
import ChatInput from './ChatInput';
import SimpleBar from 'simplebar';


// class BaseTerminal {
  
// }

export default class ChatTerminal {

  private screen: Element;
  private messageScreen: Element;
  private messages: Element;
  private chatInput: ChatInput;
  private scrollBar: SimpleBar;
  private InputSaver = new InputSaver();
  private attachedTo ?: BaseIOEntity;


  constructor(screenSelector: string) {
    const screen = document.querySelector(screenSelector);

    if (screen !== null) {
      this.screen = screen;
      removeAllChildren(screen);
    } else throw new Error('invalid selector for console screen');

    this.messageScreen = document.createElement('div');
    this.messageScreen.setAttribute('data-simplebar', 'true');
    this.messageScreen.setAttribute('data-simplebar-auto-hide', 'false');
    this.messageScreen.classList.add('messages-screen');
    this.chatInput = new ChatInput();
    this.screen.appendChild(this.messageScreen);
    this.screen.appendChild(this.chatInput.element);

    this.scrollBar = new SimpleBar(this.messageScreen as HTMLElement);
    this.messages = this.scrollBar.getContentElement();

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

    this.chatInput.clear();
    this.chatInput.setInvitation(event.invitation);

    new Promise<string>((resolve) => {
      this.chatInput.on('commit', resolve);
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
    this.messages.appendChild(line.element);
  }

  private clear() : void {
    removeAllChildren(this.messages);
  }

  private handleKeys(event : KeyboardEvent) : void {

    enum Keys { UP = 38, DOWN = 40 };

      // Input specific actions
      if (event.keyCode === Keys.UP || event.keyCode === Keys.DOWN) {
        const toDisplay = (event.keyCode === Keys.UP)
          ? this.InputSaver.getNext()
          : this.InputSaver.getPrevious();
        this.chatInput.setContent(toDisplay);
      }
  }

  private handleClick(event : Event) : void {
    if (event instanceof MouseEvent) {
      this.chatInput.focus();
    }
  }
}