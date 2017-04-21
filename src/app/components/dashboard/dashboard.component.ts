import { Component } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { ApiService } from '../../services/api.service';
import { Auth } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Org } from '../../models/org.model';
import { EventLog } from '../../models/event';

@Component({
    selector: 'dashboard',
    providers: [StatusService, ApiService, Auth],
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

    constructor(public service: StatusService, public apiService: ApiService, public auth: Auth, private router: Router) {
        //this.orgs = new Array<Org>();
        this.eventLog = new EventLog();
        this.eventLog.Push('Checking Server');
        this.service.getStatus().subscribe(
          res => {
            var event = this.eventLog.Find('Checking Server');
            event.response = 'Looking Good';
            event.status = 'success';
            this.GetOrgs();
          },
          err=> this.HandleError(err)
        );
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

    public Execute(cmd: HTMLInputElement){
      var userInput = cmd.value;
      cmd.value = null;
      var actions = userInput.split(' ');
      if(actions === null) return;

      this.eventLog.Push(userInput);
      this.searchPos = this.eventLog.events.length -1;
      switch(actions[0].toLowerCase())
      {
        case 'add':
          var postObj = {};
          switch(actions[1].toLowerCase()){
            case 'org':
                postObj = {Name: actions[2]};
            break;
            default:
              this.eventLog.SetError(userInput, actions[1] + " was not found.");
              return;
          }

          this.apiService.Post('org', { Name: actions[2]}).subscribe(
            res => this.eventLog.SetSuccess(userInput, res.text()),
            err => this.eventLog.SetError(userInput, err.statusText)
          );
        break;
        case 'cd':

        break;
        case 'get':
            this.apiService.Get(actions[1]).subscribe(
              res => this.eventLog.SetSuccess(userInput, res.text()),
              err => this.eventLog.SetError(userInput, err.statusText)
            );
        break;
        case 'post':
            this.apiService.Post(actions[1], JSON.parse(actions[2])).subscribe(
              res => this.eventLog.SetSuccess(userInput, res.text()),
              err => this.eventLog.SetError(userInput, err.statusText)
            );
        break;
        case 'put':
            this.apiService.Put(actions[1], JSON.parse(actions[2])).subscribe(
              res => this.eventLog.SetSuccess(userInput, res.text()),
              err => this.eventLog.SetError(userInput, err.statusText)
            );
        break;
        case 'delete':
            this.apiService.Delete(actions[1]).subscribe(
              res => this.eventLog.SetSuccess(userInput, res.text()),
              err => this.eventLog.SetError(userInput, err.statusText)
            );
        break;
        case '--help':
        case '-h':
          this.eventLog.SetInfo(userInput, 'Yea!  You found help');
        break;
        default:
          this.eventLog.SetWarning(userInput, 'Not sure what you were looking for.  Try typing --help or -h to learn more commands.');
      }
    }

    public SetLastCmd(cmd: HTMLInputElement, dir: number){
      if(this.eventLog.events.length === 0) return;
      cmd.value = this.eventLog.events[this.searchPos].request;
      var nextPos = this.searchPos + dir;
      if(nextPos > -1 && nextPos < this.eventLog.events.length)
        this.searchPos += dir;
    }
}
