export class Option
{
    Key: string;
    Value: any;
}

export class OptionManager
{
  private options: Option[];
  private actions: string[];

  constructor(parameters: string[]){
    this.options = new Array<Option>();
    this.actions = new Array<string>();

    this.CreateOptions(parameters);
  }

  private CreateOptions(parameters: string[]){
      for(var i = 0; i < parameters.length; i++){
        if(parameters[i].indexOf('-')){
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

  public ActionContains(key: string){
    for(var i = 0; i < this.actions.length; i++){
      if(this.actions[i] === key)
        return true;
    }
    return false;
  }

  public OptionsContain(key: string){
    for(var i = 0; i < this.options.length; i++){
      if(this.options[i].Key === key)
        return true;
    }
    return false;
  }

  public GetOption(key: string){
    for(var i = 0; i < this.options.length; i++){
      if(this.options[i].Key === key)
        return this.options[i].Value;
    }
    return null;
  }
}
