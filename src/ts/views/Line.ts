import EventEmitter from '../lib/EventEmitter';

export default class Line extends EventEmitter {

  protected _element : HTMLDivElement;
  protected _textField: HTMLDivElement;

  constructor() {
    super();
    this._element = document.createElement('div');
    this._element.classList.add('line');
    this._textField = document.createElement('div');
    this._textField.classList.add('line-content');
    this._element.appendChild(this._textField);
  }

  public setContent(html: string) {
    this._textField.innerHTML = html;
  }
  public get element() {
    return this._element;
  }
}