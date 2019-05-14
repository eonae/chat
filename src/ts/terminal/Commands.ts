import { CommandDefinition } from './Command';
import { http } from './http';

export const commands: CommandDefinition[] = [
  {
    text: 'clear',
    action: (ctx) => {
      ctx.caller.view.clear();
      return Promise.resolve();
    },
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    aliases: 'cls',
    info: 'Clears terminal screen'
  },

  {
    text: 'exit',
    action: (ctx) => {
      ctx.caller.stop();
      return Promise.resolve();
    },
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    info: 'Shuts down terminal'
  },

  {
    text: 'info',
    validation: (ctx) => {
      if (ctx.params.length === 0) return {
        result: true,
        processed: ctx.caller.getAllCommandsInfo()
      }
      if (ctx.params.length === 1) return {
        result: true,
        processed: ctx.caller.getInfo(ctx.params[0])
      }
      return false;
    },
    action: (ctx) => {
      if (ctx.processed === undefined) {
        ctx.caller.view.write(`Command ${ctx.params[0]} not found`);
      } else if (ctx.processed instanceof Array) {
        ctx.processed.forEach(info => {
          ctx.caller.view.write(`${info.name} : ${info.info}`);
        })
      } else {
        ctx.caller.view.write(`${ctx.processed.name} : ${ctx.processed.info }`);
      }
      return Promise.resolve();
    }
  },
  http
]