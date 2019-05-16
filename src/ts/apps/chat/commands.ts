import { CommandDefinition } from '../../lib/base/types';
import ChatClient from '../chat/ChatClient';
import { infoCmd, clearCmd, exitCmd } from '../../lib/base/defaultCommands';
import { isCorrectUrl } from '../../lib/util';

export const commands: CommandDefinition[] = [
  {
    text: '@status',
    aliases: '@st',
    info: 'Shows connection status',
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    action: (ctx) => {
      const client = ctx.caller as ChatClient;
      client.checkStatus(); //sync
      return Promise.resolve();
    },
  },

  {
    text: '@connect',
    aliases: '@con',
    flags: [
      { name: 'user', aliases: ['u'], type: 'string', info: 'Specifies username' }
    ],
    info: 'Connects to default server',
    validation: (ctx) => {
      if (ctx.params.length === 0) return true;
      else if (ctx.params.length === 1) {
        debugger;
        const url = ctx.params[0];
        let protocol = isCorrectUrl(url, ['ws', 'wss']);
        if (protocol) {
          if (protocol === 'any') protocol = (ctx.caller as ChatClient).defaultProtocol;
          return { result: true, processed: { url: protocol +'://' + url } }
        } else {
          return false;
        }
      } else return false;
    },
    action: (ctx) => {

      const client = ctx.caller as ChatClient;
      const url = (ctx.processed) ? ctx.processed : client.url;

      return (ctx.flags['user'])
        ? client.tryConnect(url, ctx.flags['user'] as string)
        : client.ask('username:').then(username => {
          return client.tryConnect(url, username);
        });
    }
  },
  
  {
    text: '@disconnect',
    aliases: '@dis',
    info: 'Disconnects from current server',
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    action: (ctx) => {
      const client = ctx.caller as ChatClient;
      client.disconnect(); //sync
      return Promise.resolve();
    }
  },

  {
    text: '@message',
    aliases: '@msg',
    info: 'Sends message',
    validation: (ctx) => {
      return ctx.params.length === 1;
    },
    action: (ctx) => {
      const client = ctx.caller as ChatClient;
      return client.sendMessage(ctx.params[0]);
      }
  },

  infoCmd('@info', ['@help','@?']),
  clearCmd('@clear', ['@cls']),
  exitCmd('@exit', ['@quit', '@q'])

]
