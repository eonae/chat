// import './main.scss';
// import CommandShell from './ts/apps/shell/CommandShell';
// import Terminal from './ts/views/Terminal';
// import { commands } from './ts/apps/shell/commands';

// const view = new Terminal('.screen');
// const shell = new CommandShell(commands);

// view.attachTo(shell);
// shell.run();

import './main.scss';
import ChatClient from './ts/apps/chat/ChatClient';
import Terminal from './ts/views/Terminal';
import { commands } from './ts/apps/chat/commands';

const view = new Terminal('.screen');
const chat = new ChatClient(commands, 'ws://localhost:1200');

view.attachTo(chat);
chat.run();
