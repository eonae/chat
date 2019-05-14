import Line from './Line';

export default class InputLine extends Line {

  private _input: HTMLInputElement;
  public invitation: string = '>';

  constructor() {
    super();

    const $invitation = document.createElement('div');
    $invitation.textContent = this.invitation;
    this._element.insertBefore($invitation, this._textField);

    const $input = document.createElement('input');
    $input.type = 'text';
    this._element.insertBefore($input, this._textField);

    this._input = $input;

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