import './main.scss';
import Terminal from './ts/views/Terminal';
import CommandCollection from './ts/CommandCollection';

const terminal = new Terminal('.screen');
const testCommandSet = new CommandCollection();

testCommandSet.add({
  text: 'test',
  action: (params, flags) => {
    console.log('test');
  },
  validation: (params, flags) => true,
  aliases: 't'
});
terminal.registerCommands(testCommandSet);

terminal.run();