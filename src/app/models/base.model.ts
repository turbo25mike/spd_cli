import { OptionManager } from './optionManager';
import { Option } from './option';

export class Model
{
  modelType: string;
  createdByName: string;
  createdBy: Number;
  createdDate: Date;
  updatedByName: string;
  updatedBy: Number;
  updatedDate: Date;
  removedByName: string;
  removedBy: Number;
  removedByDate: Date;
  optionMap: string;

  public Map(options: Option[]){
    var mapManager = new OptionManager(this.optionMap);

    for(var i = 0; i < options.length; i++){
        var prop = mapManager.getOption(options[i].Key.toLowerCase());
        if(prop !== null){
          if(options[i].Value === 'now()')
              this[prop] = new Date(Date.now());
          else
            this[prop] = options[i].Value;
        }
    }
  }
}
