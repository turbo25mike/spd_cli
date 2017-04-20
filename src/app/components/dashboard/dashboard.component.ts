import { Component } from '@angular/core';
import { StatusService } from '../../services/status.service';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'dashboard',
    providers: [StatusService, ApiService],
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

    constructor(public service: StatusService, public apiService: ApiService) {
        this.eventLog = new EventLog();
        this.eventLog.Push('Checking Server');
        this.service.getStatus().subscribe(res => {
          var event = this.eventLog.Find('Checking Server');
          event.response = 'Looking Good';
          event.status = 'success';
        });
        //service.getEnvironment().subscribe(res => this.apiEnvironment = res);
        //service.getLoggedIn().subscribe(res => this.apiLoggedIn = res);
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

export class Event{
  public request: string;
  public status: string;
  public response: string;

  public GetStatusClass(){
    return 'list-group-item-' + this.status;
  }
}

export class EventLog{
  public statusMap: any;
  public events: Event[];

  constructor(){
    this.events = new Array<Event>();
  }

  public Push(request: string){
    var newEvent = new Event();
    newEvent.request = request;
    this.events.push(newEvent);
  }

  public SetSuccess(request: string, response: string){
    this.SetResponse(request, 'success', response);
  }

  public SetInfo(request: string, response: string){
    this.SetResponse(request, 'info', response);
  }

  public SetWarning(request: string, response: string){
    this.SetResponse(request, 'warning', response);
  }

  public SetError(request: string, response: string){
    this.SetResponse(request, 'danger', response);
  }

  public SetResponse(request: string, status: string, response:string){
    var e = this.Find(request);
    e.status = status;
    e.response = response;
  }

  public Find(request: string){
    for(var i = this.events.length -1; i > -1; i--){
      if(this.events[i].request === request){
        return this.events[i];
      }
    }
  }
}
