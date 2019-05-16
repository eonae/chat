import { Protocols} from './base/types';

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

const allowedProtocols = [ 'http', 'https', 'ws', 'wss' ]

export function isCorrectUrl(url: string, protocols: string[] = allowedProtocols) : string | false {
  const pattern = new RegExp('^(\\S+:\\/\\/)?'+ // doubleSlash
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  const match =  pattern.exec(url);
  if (match) {
    if (!match[1]) {
      return 'any';
    } else {
      const protocol = match[1].substr(0, match[1].length - 3);
      return (protocols.indexOf(protocol) !== -1 ) ? protocol: false;
    }
  } else return false;

}