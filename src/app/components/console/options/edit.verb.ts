
import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ApiService } from '../../../services/api.service';
import { OptionManager } from '../../../models/optionManager';
import { Org } from '../../../models/org.model';
import { Work, WorkTag } from '../../../models/work.model';
import { EnvService } from '../../../services/env.service';
import { Verb } from './verb';

@Injectable()
export class EditVerb extends Verb {
  constructor(private apiService: ApiService, private toastr: ToastsManager, private env: EnvService) {
    super();
    this.name = 'edit';
  }

  getCurrentOptions() {
    if(this.env.selectedObj == null)
      return [];

    var optionsArray = new Array<string>();
    var opts = this.env.selectedObj.optionMap.split(' ');
    for (var i = 0; i < opts.length; i = i + 2) {
      optionsArray.push(opts[i] + ' ' + opts[i + 1]);
    }
    return optionsArray;
  }

  run(optionManager: OptionManager) {
    if(this.env.selectedObj == null){
      this.toastr.error('No item was selected.', 'Edit Error');
      return;
    }

      this.env.selectedObj.Map(optionManager.options);
      this.apiService.Put('work', this.env.selectedObj).subscribe(
        res => this.toastr.success('', 'Work Updated'),
        err => this.toastr.error(err.message || err.statusText, 'Error Updating Work')
      );
  }
}
