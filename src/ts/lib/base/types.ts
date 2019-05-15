import BaseIOEntity from './BaseIOEntity';

export type CommandDefinition  = {
  text: string,
  action: Action,
  validation: Validation,
  aliases ?: string[] | string,
  flags ?: Array<string | Flag>,
  info ?: string;
}

export type Context = {
  params: string[],
  flags: FlagsHash;
  processed ?: any;
  caller: BaseIOEntity;
};

export type ValidationResult = {
  result: boolean,
  error?: Error,
  processed ?: any } | boolean;

export type Action = (ctx: Context) => Promise<Error | void>;
export type Validation = (ctx: Context) => ValidationResult;

// Функция валидации должна создавать объект c полем result: boolean; 

export type Flag = {
  name: string,
  info: string,
  aliases: string[],
  type: 'boolean' | 'string'
};

export interface FlagsHash {
  [flagName: string] : string | boolean
}

export type CommandInfo = {
  name: string;
  aliases: string[];
  info: string;
  flags: Flag[];
}

export type BaseIOCallback = (event: any) => void;