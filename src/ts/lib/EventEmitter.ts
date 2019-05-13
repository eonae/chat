type eventHandler = (args: any) => void;

export default abstract class EventEmitter {

  private _map = new Map<string, Array<eventHandler> >();

  public on(eventName: string, handler: eventHandler) : void {

    const arrayOfHandlers = this._map.get(eventName);

    if (arrayOfHandlers) {
      arrayOfHandlers.push(handler);
    } else {
      const newArray = [ handler ];
      this._map.set(eventName, newArray);
    }
  }

  public off(eventName: string, handler: eventHandler) : void {

    const arrayOfHandlers = this._map.get(eventName);
    if (!arrayOfHandlers) return;

    const index = arrayOfHandlers.indexOf(handler);
    if (index === -1) return;

    arrayOfHandlers.splice(index, 1);
    if (arrayOfHandlers.length === 0) {
      this._map.delete(eventName);
    }
  }

  public emit(eventName: string, args: any): void {

    const arrayOfHandlers = this._map.get(eventName);

    if (!arrayOfHandlers || arrayOfHandlers.length === 0) return;
    
    arrayOfHandlers.forEach(handler => {
      setTimeout(() => {
        handler(args);
      });
    });
  }


}