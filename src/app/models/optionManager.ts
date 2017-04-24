import { Option } from './option';

export class OptionManager
{
  options: Option[];
  actions: string[];

  constructor(parameters: string[]){
    this.options = new Array<Option>();
    this.actions = new Array<string>();

    this.CreateOptions(parameters);
  }

  private CreateOptions(parameters: string[]){
      for(var i = 1; i < parameters.length; i++){
        if(parameters[i].indexOf('-') > -1){
          var opt = new Option();
          opt.Key = parameters[i];
          opt.Value = parameters[i+1];
          this.options.push(opt);
          i++;
        }else{
          this.actions.push(parameters[i].toLowerCase());
        }
      }
  }

  ActionContains(key: string){
    for(var i = 0; i < this.actions.length; i++){
      if(this.actions[i] === key)
        return true;
    }
    return false;
  }

  OptionsContain(key: string){
    for(var i = 0; i < this.options.length; i++){
      if(this.options[i].Key === key)
        return true;
    }
    return false;
  }

  GetOption(key: string){
    for(var i = 0; i < this.options.length; i++){
      if(this.options[i].Key === key)
        return this.options[i].Value;
    }
    return null;
  }
}
