import { Injectable } from '@angular/core';
import { OptionManager } from '../../../../models/optionManager';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EnvService } from '../../../../services/env.service';
import { Verb } from '../verb';
import { Work } from '../../../../models/work.model';
import { ApiService } from '../../../../services/api.service';

@Injectable()
export class WorkVerb extends Verb {

  constructor(private apiService: ApiService,private router: Router, private toastr: ToastsManager, private env: EnvService) {
    super();
    this.name = 'work';
    this.options = ['Work Title'];
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
