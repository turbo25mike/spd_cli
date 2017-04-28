
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

  }
}
