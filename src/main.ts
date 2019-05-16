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
import ChatTerminal from './ts/views/ChatTerminal';
import Terminal from './ts/views/Terminal';
import { commands } from './ts/apps/chat/commands';
import WebSocketService from './ts/apps/chat/WebSocketService';

const ws_service = new WebSocketService();
const view = new ChatTerminal('.screen');
const chat = new ChatClient(commands, 'ws://localhost:1200', ws_service);

view.attachTo(chat);
chat.run();
