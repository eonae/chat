import { CommandDefinition } from "./types";

export function infoCmd(name: string, aliases ?: string[] | string) : CommandDefinition {
  return {
    text: name,
    info: 'Shows info about all avaliable commands of a particual command if specified',
    aliases,
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
        ctx.caller.out(`Command ${ctx.params[0]} not found`);
      } else if (ctx.processed instanceof Array) {
        ctx.processed.forEach(info => {
          ctx.caller.out(`${info.name} : ${info.info}`);
        })
      } else {
        ctx.caller.out(`${ctx.processed.name} : ${ctx.processed.info }`);
      }
      return Promise.resolve();
    }
  }
}
export function clearCmd(name: string, aliases ?: string[] | string) : CommandDefinition {
  return {
    text: name,
    aliases,
    info: 'Clears terminal screen',
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    action: (ctx) => {
      ctx.caller.emit('clear', {});
      return Promise.resolve();
    },

  }
}
export function exitCmd(name: string, aliases ?: string[] | string) : CommandDefinition {
  return {
    text: name,
    aliases,
    info: 'Shuts down terminal',
    validation: (ctx) => {
      return ctx.params.length === 0;
    },
    action: (ctx) => {
      ctx.caller.stop();
      return Promise.resolve();
    }
  }
}