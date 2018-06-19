// query.service.ts
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Work, WorkBreadCrumb } from '../models/work.model';
import { Member } from '../models/member.model';
import { Org } from '../models/org.model';
import { Model } from '../models/base.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class QueryService {

    constructor(private apiService: ApiService, private router: Router) {}

    public getTables(list: Observable<any>) {
      return this.apiService.Get('work').subscribe(
        res => list = res,
        err => this.HandleError(err)
      );
   }

   private HandleError(err) {
     if (err.status === 401) {
       this.router.navigate(['/home']);
     }
   }
}
