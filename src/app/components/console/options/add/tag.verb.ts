import { Injectable } from '@angular/core';
import { OptionManager } from '../../../../models/optionManager';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EnvService } from '../../../../services/env.service';
import { Verb } from '../verb';
import { Work, WorkTag } from '../../../../models/work.model';
import { ApiService } from '../../../../services/api.service';

@Injectable()
export class TagVerb extends Verb {

  constructor(private apiService: ApiService,private router: Router, private toastr: ToastsManager, private env: EnvService) {
    super();
    this.name = 'tag';
    this.options = ['Title'];
  }

  run(optionManager: OptionManager) {
    if(this.env.selectedObj == null){
      this.toastr.error('No selected item found.', 'Tag Error');
      return;
    }

    this.apiService.Put('work/' + (this.env.selectedObj as Work).workID + '/tag/' + optionManager.actions[1], null).subscribe(
      res => {
        var newTag = new WorkTag();
        newTag.title = optionManager.actions[1];
        if(optionManager.actions.length > 2)
          newTag.value = optionManager.actions[2];
          if(optionManager.actions.length > 3)
            newTag.color = optionManager.actions[3];
        (this.env.selectedObj as Work).tags.push(newTag);

        this.toastr.success('', 'Work Tag Saved');
      },
      err => this.toastr.error(err.statusText, 'Error Creating Work Tag "' + optionManager.actions[1] + '"')
    );
  }
}
