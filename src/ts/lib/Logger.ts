interface ILogger {
  tag: 'logger';
  info: (msg: string) => void;

}

class Logger implements ILogger {
  public tag!: 'logger';

  info(msg: string) {
    console.log(msg);
  }
}

class AdvancedLogger implements ILogger {
  public tag!: 'logger';

  info(msg: string) {
    console.log(`${Date.now()} > ${msg}`);
  }
}

export { ILogger, Logger, AdvancedLogger };