import { ITerminal } from './Terminal';

type Context = {
  params: string[],
  flags: FlagsHash;
  processed ?: any;
  caller: ITerminal;
};

type ValidationResult = { result: boolean, error?: Error, processed ?: any } | boolean;

type Action = (ctx: Context) => Promise<Error | void>;
type Validation = (ctx: Context) => ValidationResult;

// Функция валидации должна создавать объект c полем result: boolean; 

type CommandDefinition  = {
  text: string,
  action: Action,
  validation: Validation,
  aliases ?: string[] | string,
  flags ?: Array<string | Flag>,
  info ?: string;
}

type Flag = { name: string, info: string, aliases: string[], type: 'boolean' | 'string' };

interface FlagsHash {
  [flagName: string] : string | boolean
}

class Command {

  public readonly text: string;
  public readonly info: string;

  private readonly _aliases: string[];
  private readonly _flags: Flag[] = [];
  private readonly _action: Action;
  private readonly _validation: Validation;
  private _terminal: ITerminal;

  constructor(def: CommandDefinition, caller: ITerminal) {
    this.text = def.text;
    this._action = def.action;
    this._validation = def.validation;
    this._terminal = caller;

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
      return Promise.resolve(err);
    }
    // Validating parameters
    const ctx = {
      params,
      flags: resolvedFlags,
      caller: this._terminal,
      processed: undefined
    }
    const val = this._validation(ctx);
    const result = (typeof val === 'boolean') ? val : val.result;
    if (!result) {
      const error = (typeof val === 'boolean') ? new Error('Invalid parameters!') : val.error;
      return Promise.resolve(error);
    }
    
    if (typeof val !== 'boolean' && val.processed) {
      ctx.processed = val.processed;
    }
    return this._action(ctx);
  }

  private _resolveFlags(flags: string[]) : FlagsHash {
      const hash: FlagsHash = {};
      flags.forEach(rawFlag => {
        debugger;

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

  
  public bindToTerminal(terminal: ITerminal) {
    if (!this._terminal) this._terminal = terminal;
  }

  public get flags() : Flag[] {
    return this._flags.slice(0);
  }
  public get aliases() : string[] {
    return this._aliases.slice(0);
  }
}

export { CommandDefinition, Flag, Command };