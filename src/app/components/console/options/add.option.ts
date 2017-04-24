
import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { OptionManager } from '../../../models/optionManager';
import { Org } from '../../../models/org.model';
import { Work } from '../../../models/work.model';

@Injectable()
export class AddOption {
    private optionManager: OptionManager;

    constructor(private apiService: ApiService){}

    public Run(parameters: string[]){
      this.optionManager = new OptionManager(parameters);
      return this.apiService.Post(parameters[1].toLowerCase(), this.CreateModel());
    }

    private CreateModel(){
      var postObj: any;
      switch(this.optionManager.actions[0]){
        case 'org':
          postObj = new Org();
          postObj.Name = this.optionManager.actions[1];
          break;
        case 'work':
          postObj = new Work();
          postObj.Title = this.optionManager.actions[1];
          break;
      }
      return postObj;
    }
}
