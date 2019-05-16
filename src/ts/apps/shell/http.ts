import { CommandDefinition } from "../../lib/base/types";
import { isCorrectUrl } from '../../lib/util'; 

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
          ctx.caller.out('"Content-Type" header not found');
          return Promise.resolve('');
        } else if (!isAllowedContentType(contentType)) {
          ctx.caller.out(`Content type "${contentType}" is not supported`);
          return Promise.resolve('');
        } else {
          ctx.caller.out(`Content-Type: "${contentType}"`);
          return response.text()
        }

      })
      .then(data => {
          if (typeof data === 'string')
            ctx.caller.out(data);
      })
      .catch(err => {
        ctx.caller.out(err.message);
      })
  }
}

function isAllowedContentType(contentType: string) : boolean {
  for(let pattern of allowedContentTypes) {
    if (pattern.test(contentType)) return true;
  }
  return false;
}