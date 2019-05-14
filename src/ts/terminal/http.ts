import { CommandDefinition } from "./Command";

const allowedMethods = ['get', 'delete'];
const allowedContentTypes = [ /text\//, /application\/json/ ];

export const http: CommandDefinition = {
  text: 'http',
  aliases: 'req',
  flags: [
    {
      name: 'window',
      aliases: ['w'],
      type: 'boolean',
      info: 'Opens response in new browser window'
    }
  ],
  validation: (ctx) => {

    const method = ctx.params[0];
    if (!method)
      return {
        result: false,
        error: new Error('No method specified!')
      };
    else if (allowedMethods.indexOf(method) === -1)
      return {
        result: false,
        error: new Error(`Invalid method: ${method}. Only ${allowedMethods.join(',')} are allowed`)
      };

    const url = ctx.params[1];
    if (!url)
      return {
        result: false,
        error: new Error('No url specified!')
      }
    else if (!isCorrectUrl(url))
      return {
        result: false,
        error: new Error(`Incorrect url`)
      };

    if (ctx.params[2])
      return {
        result: false,
        error: new Error(`Unknown argument ${ctx.params[2]}`)
      }

    return {
      result: true,
      processed: { url, method }
    }
  },
  action: (ctx) => {
    const init: RequestInit = {
      method: ctx.processed.method,
      mode: 'cors'
    }

    if (ctx.flags['window']) {
      window.open(ctx.processed.url, '_blank');
      return Promise.resolve();
    }

    return fetch(ctx.processed.url, init)
      .then(response => {
        const contentType = response.headers.get('Content-Type');
        if (!contentType) {
          ctx.caller.view.write('"Content-Type" header not found');
          return Promise.resolve('');
        } else if (!isAllowedContentType(contentType)) {
          ctx.caller.view.write(`Content type "${contentType}" is not supported`);
          return Promise.resolve('');
        } else {
          ctx.caller.view.write(`Content-Type: "${contentType}"`);
          return response.text()
        }

      })
      .then(data => {
          if (typeof data === 'string')
            ctx.caller.view.write(data);
      })
      .catch(err => {
        ctx.caller.view.write(err.message);
      })
  }
}

function isCorrectUrl(url: string) : boolean {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(url);
}

function isAllowedContentType(contentType: string) : boolean {
  for(let pattern of allowedContentTypes) {
    if (pattern.test(contentType)) return true;
  }
  return false;
}