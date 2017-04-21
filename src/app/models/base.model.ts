import {Option, OptionManager} from './option';

export class Model
{
  CreatedBy: Number;
  CreatedDate: Date;
  UpdatedBy: Number;
  UpdatedDate: Date;
  optionMap: string;

  public Map(options: Option[]){
    var mapManager = new OptionManager(this.optionMap.split(' '));

    for(var i = 0; i < options.length; i++){
        var prop = mapManager.GetOption(options[i].Key.toLowerCase());
        if(prop !== null)
          this[prop] = options[i].Value;
    }
  }
}
