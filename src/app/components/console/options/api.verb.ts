
import { Injectable, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Auth } from '../../../services/auth.service';
import { OptionManager } from '../../../models/optionManager';
import { Org } from '../../../models/org.model';
import { Work } from '../../../models/work.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EnvService } from '../../../services/env.service';
import { Verb } from './verb';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class ApiVerb extends Verb {
  constructor(
    private apiService: ApiService,
    private toastr: ToastsManager,
    private env: EnvService,
    private auth: Auth,
    private router: Router
  ) {
    super();
    this.name = 'api';
    this.options = ['get [route]', 'post  [route] [jsonObj]', 'put [route] [jsonObj]', 'delete [route]'];
  }

  run(optionManager: OptionManager) {
    switch (optionManager.actions[0].toLowerCase()) {
      case 'get':
        this.listenToApiCall(this.apiService.Get(optionManager.actions[0]));
        break;
      case 'post':
        this.listenToApiCall(this.apiService.Post(optionManager.actions[0], JSON.parse(optionManager.actions[1])));
        break;
      case 'put':
        this.listenToApiCall(this.apiService.Put(optionManager.actions[0], JSON.parse(optionManager.actions[1])));
        break;
      case 'delete':
        this.listenToApiCall(this.apiService.Delete(optionManager.actions[0]));
        break;
    }
  }

  private listenToApiCall(apiCall: any) {
    apiCall.subscribe(
      res => this.toastr.success(res.text().toString(), 'Successful Request'),
      err => this.HandleError(err)
    );
  }

  public HandleError(err) {
    if (err.status === 401 || (err.message && err.message.indexOf('No JWT') > -1)) {
      this.auth.logout();
      this.router.navigate(['/home']);
    } else {
      this.toastr.error('An error occured', err.message || err.statusText);
    }
  }
}
