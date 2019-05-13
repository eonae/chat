import Line from './Line';

export default class InputLine extends Line {

  private _invitation: HTMLDivElement;
  private _input: HTMLInputElement;

  constructor() {
    super();
    this._invitation = document.createElement('div');
    this._invitation.textContent = '>';
    this._element.insertBefore(this._invitation, this._textField);
    this._input = document.createElement('input');
    this._input.type = 'text';
    this._input.focus();
    this._element.insertBefore(this._input, this._textField);
    this._textField.classList.add('hidden');

    this.handleKeys = this.handleKeys.bind(this);

    window.addEventListener('keydown', this.handleKeys);
  }

  public get input() : HTMLInputElement {
    return this._input;
  }

  private handleKeys(event : KeyboardEvent) {

    enum Keys { ENTER = 13 };

    if (event.keyCode === Keys.ENTER && this._input === document.activeElement) {

      this.commit();
    }
  }

  public commit() {
    const value = this._input.value;
    this._textField.innerHTML = this.decorateText(value);
    this._textField.classList.remove('hidden');
    this._input.classList.add('hidden');
    window.removeEventListener('keydown', this.handleKeys);
    this.emit('commit', value);
  }

  public setContent(html: string) {
    this._input.value = html;
  }

  public focus() : void {
      this._input.focus();
  }

  private decorateText(sourceStr: string): string {
    return sourceStr; // Пока так.
  }
}