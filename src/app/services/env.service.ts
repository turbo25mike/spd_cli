import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Work } from '../models/work.model';
import { Org } from '../models/org.model';
import { Model } from '../models/base.model';
import { Auth } from './auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/util/isNumeric';

@Injectable()
export class EnvService {
  selectedObj: Model;

  userWorkList: Work[];
  orgs: Org[];

  constructor(private apiService: ApiService, public auth: Auth, private router: Router) {
    this.GetOrgs();
    this.GetPersonalWork();
  }

  private HandleError(err) {
    if (err.status === 401) {
      this.auth.logout();
      this.router.navigate(['/home']);
    }
  }

  private GetPersonalWork() {
    this.apiService.Get('work').subscribe(
      res => {
        this.userWorkList = Work.fromJSONArray(res);
      },
      err => this.HandleError(err)
    );
  }

  private GetOrgs() {
    this.apiService.Get('org').subscribe(
      res => this.orgs = res as Org[],
      err => this.HandleError(err)
    );
  }

  public setSelectedOrg(org: any) {
    if (!org) this.selectedObj = null;
    if (typeof org === 'object') {
      this.selectedObj = org as Org;
      return;
    }

    var found = this.find(org, this.orgs, ['name', 'orgID'], isNaN(parseInt(org)));
    this.selectedObj = found;
  }

  public setSelectedWork(work: any) {
    if (!work) return;
    if (typeof work === 'object') {
      this.selectedObj = work as Work;
      return;
    }

    var foundWork = this.find(work, this.userWorkList, ['title', 'workID', 'children'], isNaN(parseInt(work)));
    this.selectedObj = foundWork;
  }

  private find(search: string, array: Array<any>, propList: Array<string>, stringSearch: boolean) {
    if(array == null) return null;
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < propList.length; j++) {
        if(typeof array[i][propList[j]] === 'object'){
          var found = this.find(search, array[i][propList[j]], propList, stringSearch);
          if(found)
            return found;
        }
        else if ((stringSearch && array[i][propList[j]].indexOf(search) > -1) || array[i][propList[j]] == search)
          return array[i];
      }
    }
    return null;
  }
}
