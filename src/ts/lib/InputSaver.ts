export default class InputSaver {

  private _store: string[] = [];
  private _cursor: number = -1;
  private _limit: number = 10;

  public push(input: string) : void {
    this._store.unshift(input);
    
    if (this._store.length >= this._limit) {
      this._store.pop();
    }
    this._cursor = -1;
  }

  public getAll() {
    return this._store.slice(0);
  }

  public getNext() {
    if (this._store.length === 0) {
      return '';
    }
    else {
      return (this._cursor < this._store.length - 1)
        ? this._store[++this._cursor]
        : this._store[this._cursor];
    }
  }

  public getPrevious() {
    if (this._cursor === 0) {
      this._cursor = -1;
      return '';
    } else {
      return (this._cursor > - 1)
        ? this._store[--this._cursor]
        : '';
    }
  }

  public setLimit(limit: number) {
    this._limit = limit;
    if (this._store.length > limit) {
      this._store.splice(this._store.length, limit - this._store.length);
    }
    this._cursor = -1;
  }
}