import Line from './Line';

export default class ChatInput extends Line {

  private _input: HTMLInputElement;
  private _invitation : HTMLDivElement;
  public setInvitation(invitation: string): void {
    this._invitation.textContent = invitation;
  }

  constructor(invitation: string = '>') {
    super();

    this._element.classList.add('chat-input');
    
    const $invitation = document.createElement('div');
    $invitation.textContent = invitation;
    this._element.insertBefore($invitation, this._textField);
    this._invitation = $invitation;

    const $input = document.createElement('input');
    $input.type = 'text';
    this._element.insertBefore($input, this._textField);
    this._input = $input;

    this._textField.classList.add('hidden');

    this.handleKeys = this.handleKeys.bind(this);
    window.addEventListener('keydown', this.handleKeys);
  }

  public clear() : void {
    this.setContent('');
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
    this.emit('commit', this._input.value);
    this._input.value = '';
  }

  public setContent(html: string) {
    this._input.value = html;
  }

  public focus() : void {
      this._input.focus();
  }
}