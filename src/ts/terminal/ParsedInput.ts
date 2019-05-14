export default class ParsedInput {

  public command: string = '';
  public arguments: string[] = [];
  public flags: string[] = [];

  public static getFrom(source: string) : ParsedInput {
    const result = new ParsedInput();
    const arr = source.trim().split(' ');
    result.command = arr[0];
    arr.splice(0, 1);
    result.flags = ParsedInput.refineFlags(arr.filter(item => ParsedInput.isFlag(item)));
    result.arguments = arr.filter(item => !ParsedInput.isFlag(item));

    return result;
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