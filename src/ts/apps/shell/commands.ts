import { CommandDefinition } from '../../lib/base/types';
import { http } from './http';
import { infoCmd, clearCmd, exitCmd } from '../../lib/base/defaultCommands';

export const commands: CommandDefinition[] = [
  clearCmd('clear', ['cls']),
  infoCmd('info', ['help', '/?']),
  exitCmd('exit'),
  http
]

