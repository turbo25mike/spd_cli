
import { Injectable, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { OptionManager } from '../../../models/optionManager';
import { Org } from '../../../models/org.model';
import { Work } from '../../../models/work.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EnvService } from '../../../services/env.service';
import { Verb } from './verb';

@Injectable()
export class AddVerb extends Verb {
  constructor(private apiService: ApiService, private toastr: ToastsManager, private env: EnvService) {
    super();
    this.name = 'add';
  }

  getCurrentOptions() {
    if(this.env.selectedObj == null)
      return ['Child Title'];

    var optionsArray = new Array<string>();
    var opts = this.env.selectedObj.optionMap.split(' ');
    for (var i = 0; i < opts.length; i = i + 2) {
      optionsArray.push(opts[i] + ' ' + opts[i + 1]);
    }
    return optionsArray;
  }

  run(optionManager: OptionManager) {
    if(optionManager.actions.length > 0){
        var model = new Work();
        model.title = optionManager.actions[0];

        if (this.env.selectedObj !== null) {
          model.parentWorkID = (this.env.selectedObj as Work).workID;
          model.orgID = (this.env.selectedObj as Work).orgID;
        }
        this.apiService.Post('work', model).subscribe(
          res => this.toastr.success(res, 'Work Saved'),
          err => this.toastr.error(err.statusText, 'Error Creating Work "' + optionManager.actions[0] + '"')
        );
        return;
    }
    else if(this.env.selectedObj != null){
      var work:Work = this.env.selectedObj as Work;
      this.env.selectedObj.Map(optionManager.options);
      this.apiService.Put('work', work).subscribe(
        res => this.toastr.success('', 'Work Updated'),
        err => this.toastr.error(err.message || err.statusText, 'Error Updating Work')
      );
    }
    else{
      this.toastr.error('We can not create or apply updates if neither a title or a selected object is given.', 'Error');
    }
  }
}
