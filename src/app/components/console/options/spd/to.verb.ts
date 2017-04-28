import { Injectable } from '@angular/core';
import { OptionManager } from '../../../../models/optionManager';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EnvService } from '../../../../services/env.service';
import { Verb } from '../verb';
import { Work } from '../../../../models/work.model';

@Injectable()
export class ToVerb extends Verb {

  constructor(private router: Router, private toastr: ToastsManager, private env: EnvService) {
    super()
    this.name = 'to';
    this.options = ['Work ID', 'Work Title', '-r'];
  }

  run(optionManager: OptionManager) {
    if (optionManager.optionsContain('-r'))
      this.router.navigate(['/dashboard']);

    if (this.env.selectedObj == null || this.env.selectedObj.modelType === 'work') {
      this.env.setSelectedWork(optionManager.actions[0]);
      if (this.env.selectedObj == null)
        this.toastr.error('Not Found', 'Work ' + optionManager.actions[0]);
      else
        this.router.navigate(['/work', (this.env.selectedObj as Work).workID]);
    }
  }
}
