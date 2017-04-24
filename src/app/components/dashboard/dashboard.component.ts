import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Auth } from '../../services/auth.service';
import { Org } from '../../models/org.model';
import { EventLog } from '../../models/event';

@Component({
    selector: 'dashboard',
    providers: [ApiService, Auth],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    public apiStatus: any;
    public apiEnvironment: any;
    public apiLoggedIn: string;
    public eventLog: EventLog;
    public searchPos: number = 0;
    public currentWorkID: number;
    public orgs : Org[];

    constructor(public apiService: ApiService, public auth: Auth, private router: Router) {
        this.GetOrgs();
    }

    private GetOrgs(){
      this.apiService.Get('org').subscribe(
        res => this.orgs = res as Org[],
        err => this.HandleError(err)
      );
    }

    public HandleError(err){
      if(err.status === 401){
            this.auth.logout();
            this.router.navigate(['/home']);
      }
    }
}
