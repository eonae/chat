import './main.scss';
import { Terminal } from './ts/terminal/Terminal';
import { TerminalView } from './ts/views/TerminalView';
import { commands } from './ts/terminal/Commands';

const terminal = new Terminal(new TerminalView('.screen'), commands);

terminal.run();