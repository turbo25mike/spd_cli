
import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Option } from '../../../models/option';
import { Org } from '../../../models/org.model';
import { Work } from '../../../models/work.model';

@Injectable()
export class AddOption {
    private options: Option[];
    private actions: string[];

    constructor(private apiService: ApiService){
        this.options = new Array<Option>();
        this.actions = new Array<string>();
    }

    public Run(parameters: string[]){
      this.CreateOptions(parameters);
      return this.apiService.Post(parameters[1].toLowerCase(), this.CreateModel());
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

    private CreateModel(){
      var postObj: any;
      switch(this.actions[0]){
        case 'org':
          postObj = new Org();
          postObj.Name = this.actions[1];
          break;
        case 'work':
          postObj = new Work();
          postObj.ParentWorkID: number;
          postObj.OrgID: number;
          postObj.Title: string;
          postObj.Description: string;
          postObj.Owner: number;
          postObj.Size: number;
          postObj.Priority: number;
          postObj.HoursWorked: number;
          postObj.StartDate: Date;
          postObj.CompleteDate: Date;
          break;
      }
      return postObj;
    }
}
