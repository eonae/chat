export function bind(owner: any, toBind: Function | Function[]): void {
  if (!(toBind instanceof Array)) toBind = [ toBind ];
  toBind.forEach(method => {
    owner[method.name] = method.bind(owner);
  })
}

export function isError(obj: any) {
  return obj instanceof Error;
}

export function removeAllChildren(parent: Element) : void {

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}