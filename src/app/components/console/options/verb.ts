import { OptionManager } from '../../../models/optionManager';

export class Verb {
  options: string[];
  name: string;
  verbs: Verb[];

  getOptions(params: string[]): string[] {
    if (params.length === 0)
      return this.getCurrentOptions();

    var nextVerb = this.findVerb(params[0]);
    params.splice(0,1); //removes the currentParam
    return (nextVerb) ?
      nextVerb.getOptions(params) : this.getCurrentOptions();
  }

  run(optionManager: OptionManager) {
    var verbName = optionManager.popAction();
    var verb = this.findVerb(verbName);
    if (verb){
      verb.run(optionManager);
    }
  }

  getCurrentOptions(){
    return this.getVerbNames().concat(this.options);
  }

  private findVerb(name: string): Verb {
    name = name.toLowerCase();

    if (this.verbs == null) return null;
    for (var i = 0; i < this.verbs.length; i++) {
      if (this.verbs[i].name === name)
        return this.verbs[i];
    }
    return null;
  }

  private getVerbNames(): string[] {
    var results: string[] = new Array<string>();
    if (this.verbs == null) return results;
    for (var i = 0; i < this.verbs.length; i++) {
      results.push(this.verbs[i].name);
    }
    return results;
  }
}
