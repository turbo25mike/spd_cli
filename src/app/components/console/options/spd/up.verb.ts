import { Injectable } from '@angular/core';
import { OptionManager } from '../../../../models/optionManager';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnvService } from '../../../../services/env.service';
import { Verb } from '../verb';
import { Work } from '../../../../models/work.model';

@Injectable()
export class UpVerb extends Verb {

  constructor(private router: Router, private env: EnvService) {
    super()
    this.name = 'up';
  }

  run(optionManager: OptionManager) {
    if(this.env.selectedObj == null){
        this.router.navigate(['/dashboard']);
        return;
    }

      (this.env.selectedObj as Work).parentWorkID != null ?
        this.router.navigate(['/work', (this.env.selectedObj as Work).parentWorkID]) :
        this.router.navigate(['/dashboard']);
    
  }
}
