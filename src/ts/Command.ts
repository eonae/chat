export default class Command {

  public readonly aliases: string[] = [];

  constructor(
    public readonly text: string,
    private action: (params: string[], flags: string[]) => void,
    private validation: (params: string[], flags: string[]) => void) {}

  setAlias(aliases: string | string[]) : void {
    this.aliases.concat(aliases);
  }

  removeAlias(alias: string) : void {
    const index = this.aliases.indexOf(alias);
    if (index !== -1) {
      this.aliases.splice(index, 1);
    }
  }

  exec(params: string[], flags: string[]) : Promise<boolean> {
    console.log(params, flags);
    return Promise.resolve<boolean>(true);
  }
}