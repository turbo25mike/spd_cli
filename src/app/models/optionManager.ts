import { Option } from './option';

export class OptionManager {
  options: Option[];
  actions: string[];
  params: string[];

  constructor(parameters: string) {
    this.options = new Array<Option>();
    this.actions = new Array<string>();

    this.ParamStringToArray(parameters);
    this.createActionsAndOptions();
  }

  private ParamStringToArray(p: string) {
    this.params = new Array<string>();

    var quoteIndexes = this.getAllIndexesOf(p, '"');
    for (var i = 0; i + 1 < quoteIndexes.length; i = i + 2) {
      var indOfFirst = quoteIndexes[i] + 1;
      var indOfLast = quoteIndexes[i + 1];
      var letterCount = indOfLast - indOfFirst;
      var action = p.substr(indOfFirst, letterCount);
      var cleanAction = this.replaceAll(action, ' ', '\u22A5');
      p = this.replaceAll(p, action, cleanAction);
    }

    p = this.replaceAll(p, '"', '');
    var encodedList = p.split(' ');

    for (var i = 0; i < encodedList.length; i++) {
      this.params.push(this.replaceAll(encodedList[i], '\u22A5', ' '));
    }
  }

  private escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  private replaceAll(str, find, replace) {
    return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
  }

  private getAllIndexesOf(arr: string, val: string) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes.push(i);
    }
    return indexes;
  }

  private getNextPos(startIndex: number, p: string, char: string) {
    for (var i = startIndex; i < p.length; i++) {
      if (p[i] === char) {
        return i;
      }
    }
    return p.length;
  }

  private createActionsAndOptions() {
    for (var i = 0; i < this.params.length; i++) {
      if (this.params[i].indexOf('-') > -1) {
        var opt = new Option();
        opt.Key = this.params[i];
        opt.Value = this.params[i + 1];
        this.options.push(opt);
        i++;
      } else {
        this.actions.push(this.params[i]);
      }
    }
  }

  popAction(): string {
    if (this.actions.length < 1) return;
    var first = this.actions[0];
    this.actions.splice(0, 1);
    return first;
  }

  actionContains(key: string) {
    for (var i = 0; i < this.actions.length; i++) {
      if (this.actions[i] === key)
        return true;
    }
    return false;
  }

  optionsContain(key: string) {
    for (var i = 0; i < this.options.length; i++) {
      if (this.options[i].Key === key)
        return true;
    }
    return false;
  }

  getOption(key: string) {
    for (var i = 0; i < this.options.length; i++) {
      if (this.options[i].Key === key)
        return this.options[i].Value;
    }
    return null;
  }
}
