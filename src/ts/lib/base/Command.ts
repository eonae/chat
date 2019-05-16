import BaseIOEntity from './BaseIOEntity';
import { Flag, Action, Validation, CommandDefinition, FlagsHash } from './types';

export default class Command {

  public readonly text: string;
  public readonly info: string;

  private readonly _aliases: string[];
  private readonly _flags: Flag[] = [];
  private readonly _action: Action;
  private readonly _validation: Validation;
  private _caller: BaseIOEntity;

  constructor(def: CommandDefinition, caller: BaseIOEntity) {
    this.text = def.text;
    this._action = def.action;
    this._validation = def.validation;
    this._caller = caller;

    this.info = (def.info) ? def.info : 'No info for this command';
    
    if (def.aliases) {
      this._aliases = (typeof def.aliases === 'string') ? [def.aliases] : def.aliases;
    } else {
      this._aliases = [];
    }
    
    if (def.flags) {
      def.flags.forEach(f => {
        if (typeof f === 'string') {
          this._flags.push({ name: f, info: 'No info for this flag', aliases: [], type: 'boolean' })
        } else {
          this._flags.push(f);
        }
      });
    }
  }

  exec(params: string[], flags: string[]) : Promise<Error | void> {
    // Checking flags correctness
    let resolvedFlags: FlagsHash;
    try {
      resolvedFlags = this._resolveFlags(flags);
    } catch (err) {
      return Promise.reject(err);
    }
    // Validating parameters
    const ctx = {
      params,
      flags: resolvedFlags,
      caller: this._caller,
      processed: undefined
    }
    const val = this._validation(ctx);
    const result = (typeof val === 'boolean') ? val : val.result;
    if (!result) {
      const error = (typeof val === 'boolean') ? new Error('Invalid parameters!') : val.error;
      return Promise.reject(error);
    }
    
    if (typeof val !== 'boolean' && val.processed) {
      ctx.processed = val.processed;
    }
    return this._action(ctx);
  }

  private _resolveFlags(flags: string[]) : FlagsHash {
      const hash: FlagsHash = {};
      flags.forEach(rawFlag => {

        const arr = rawFlag.split('=');
        if (arr.length > 2) throw new Error('Invalid flag!');
        const { flag, value } = (arr.length === 1)
          ? { flag: arr[0], value: true }
          : { flag: arr[0], value: arr[1] };

        const findByName = this._flags.find(f => f.name === flag);
        if (findByName) {
          if (findByName.type === typeof value) hash[flag] = value;
          else throw new Error(`Invalid value for flag${flag}`);
        }
        else {
          const findByAlias = this._flags.find(f => f.aliases.indexOf(flag) !== -1);
          if (findByAlias) {
            if (findByAlias.type === typeof value) hash[flag] = value;
            else throw new Error(`Invalid value for flag${flag}`);
          }
          else throw new Error('Invalid flag!');
        }
      });
      return hash;
  }

  public get flags() : Flag[] {
    return this._flags.slice(0);
  }
  public get aliases() : string[] {
    return this._aliases.slice(0);
  }
}