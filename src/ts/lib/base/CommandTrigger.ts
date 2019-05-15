export default class CommandTrigger {

  public command: string = '';
  public arguments: string[] = [];
  public flags: string[] = [];

  public static getFrom(source: string) : CommandTrigger {
    const trigger = new CommandTrigger();
    const arr = source.trim().split(' ');
    trigger.command = arr[0];
    arr.splice(0, 1);
    trigger.flags = CommandTrigger.refineFlags(arr.filter(item => CommandTrigger.isFlag(item)));
    trigger.arguments = arr.filter(item => !CommandTrigger.isFlag(item));

    return trigger;
  }

  private static isFlag(value: string) : boolean {
    return /^\-{1,2}/.test(value);
  }
  
  private static refineFlags(flags: string[]) : string[] {
    let result: string[] = [];
    flags.forEach(f => {
      const temp = f.substr(1); // Удаляем первый слэш
      if (temp.substr(0, 1) === '-') result.push(temp.substr(1));
      else result = result.concat(temp.split(''));
    })
    return result;
  }

}