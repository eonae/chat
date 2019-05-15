import { CommandDefinition } from '../../lib/base/types';
import ChatClient from '../chat/ChatClient';
import { infoCmd, clearCmd, exitCmd } from '../../lib/base/defaultCommands';
import CommandTrigger from '../../lib/base/CommandTrigger';

export const commands: CommandDefinition[] = [
  {
    text: '@status',
    aliases: '@st',
    info: 'Shows connection status',
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    action: (ctx) => {
      const socket = (ctx.caller as ChatClient).socket;
      const status = (socket) ? 'CONNECTED' : 'DISCONNECTED';
      ctx.caller.out(`Your are currently <b>${status}</b>`)
      return Promise.resolve();
    },
  },

  {
    text: '@connect',
    aliases: '@con',
    info: 'Connects to default server',
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    action: (ctx) => {
      const socket = (ctx.caller as ChatClient).socket;
      if (socket) {
        ctx.caller.out('Your are already connected');
        return Promise.resolve();
      } 
      else {
        const client = ctx.caller as ChatClient;
        const ws = new WebSocket(client.url);
        ctx.caller.out('Connecting...')
        return new Promise(resolve => {
          ws.onopen = () => {
            client.connect(ws);
            ctx.caller.executeCommand(CommandTrigger.getFrom('@clear'));
            ctx.caller.out('Connection successful!');
            resolve();
          }
          ws.onclose = () => {
            ctx.caller.out('Disconnected.');
          }
          ws.onmessage = event => {
            ctx.caller.out(event.data);
          }
        });

      }
    },
  },
  
  {
    text: '@disconnect',
    aliases: '@dis',
    info: 'Disconnects from current server',
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    action: (ctx) => {
      const socket = (ctx.caller as ChatClient).socket;
      if (!socket) ctx.caller.out('Your are not connected to any server');
      else {
        socket.close(0, 'disconnection command');
      }
      return Promise.resolve();
    },
  },

  {
    text: '@message',
    aliases: '@msg',
    info: 'Sends message',
    validation: (ctx) => {
      return ctx.params.length === 1;
    },
    action: (ctx) => {
      debugger;
      const socket = (ctx.caller as ChatClient).socket;

      if (!socket) {
        return Promise.resolve(new Error('You are not connected to any server'));
      }
      else {
        socket.send(ctx.params[0]);
        return Promise.resolve();
      }
      
    },
  },

  infoCmd('@info', ['@help','@?']),
  clearCmd('@clear', ['@cls']),
  exitCmd('@exit', ['@quit', '@q'])

]
