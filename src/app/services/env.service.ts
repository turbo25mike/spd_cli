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
export class EnvService {
  selectedObj: Model;
  selectedObjLoaded: Observable<any>;
  orgsLoaded: Observable<any>;
  workLoaded: Observable<any>;
  userLoaded: boolean;
  user: Member;

  userWorkList: Work[];
  orgs: Org[];

  constructor(private apiService: ApiService, private router: Router, private toastr: ToastsManager) {
    this.GetUser();
  }

  private HandleError(err) {
    if (err.status === 401) {
      this.router.navigate(['/home']);
    }
  }

  private GetUser() {
    var call = this.apiService.Get('member');
    call.subscribe(
      res => {
        this.user = res as Member;
        this.userLoaded = true;
        this.orgsLoaded = this.GetOrgs();
        this.workLoaded = this.GetWork();
      },
      err => console.log(err)
    );
  }

  private GetWork() {
    var call = this.apiService.Get('work');
    call.subscribe(
      res => this.userWorkList = Work.fromJSONArray(res),
      err => this.HandleError(err)
    );
    return call;
  }

  private GetOrgs() {
    var call = this.apiService.Get('org');
    call.subscribe(
      res => this.orgs = res as Org[],
      err => this.HandleError(err)
    );
    return call;
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
      work = (work as Work).workID;
    }

    var foundWork: Work = this.find(work, this.userWorkList, ['title', 'workID', 'children'], isNaN(parseInt(work)));
    if (foundWork == null) {
      this.toastr.error('We could not find: ' + work + '. Please refresh the window to try again.');
      return;
    }

    if (foundWork.parentWorkID != null) {
      var foundParent = this.find(foundWork.parentWorkID.toString(), this.userWorkList, ['title', 'workID', 'children'], false);
      if (foundParent)
        foundWork.parentWorkTitle = foundParent.title;

    }

    this.selectedObj = foundWork;
  }

  getBreadcrumbs(): WorkBreadCrumb[] {
    if (this.selectedObj == null) return new Array<WorkBreadCrumb>();

    return this.getBreadcrumbHierarchy((this.selectedObj as Work).parentWorkID, null);
  }

  private getBreadcrumbHierarchy(workID: number, crumbTrail: WorkBreadCrumb[]): WorkBreadCrumb[] {
    if (!workID)
      return crumbTrail;
    if (!crumbTrail)
      crumbTrail = new Array<WorkBreadCrumb>();

    var foundWork = this.find(workID.toString(), this.userWorkList, ['workID', 'children'], false);
    if (foundWork == null) return crumbTrail;

    var crumb = new WorkBreadCrumb();
    crumb.title = (foundWork as Work).title;
    crumb.workID = (foundWork as Work).workID;
    crumbTrail.push(crumb);

    if (foundWork.parentWorkID != null) {
      var crumbs = this.getBreadcrumbHierarchy((foundWork as Work).parentWorkID, crumbTrail);
      if (crumbs != null) {
        crumbTrail = crumbTrail.concat(crumbs);
      }
    }

    return crumbTrail;
  }

  private find(search: string, array: Array<any>, propList: Array<string>, stringSearch: boolean) {
    if (array == null) return null;
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < propList.length; j++) {
        if (typeof array[i][propList[j]] === 'object') {
          var found = this.find(search, array[i][propList[j]], propList, stringSearch);
          if (found)
            return found;
        }
        else if ((stringSearch && array[i][propList[j]].indexOf(search) > -1) || array[i][propList[j]] == search)
          return array[i];
      }
    }
    return null;
  }
}
