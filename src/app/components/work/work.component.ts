import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EnvService } from '../../services/env.service';
import { Work, WorkBreadCrumb, WorkChat, WorkChatDateGroup, WorkTag, Ticket } from '../../models/work.model';
import { Member } from '../../models/member.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent {
  id: number;
  currentWork: Work;
  tags: WorkTag[];
  activeChildren: Work[];
  inactiveChildren: Work[];
  workChatDateGroups: WorkChatDateGroup[];
  crumbTrail: WorkBreadCrumb[];
  workMembers: Member[];
  tickets: Ticket[];
  showActive: boolean = true;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private env: EnvService,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.currentWork = new Work();
    this.activeChildren = new Array<Work>();
    this.inactiveChildren = new Array<Work>();
    this.tags = new Array<WorkTag>();
    this.crumbTrail = new Array<WorkBreadCrumb>();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => this.getWorkMembers(params['id'])
    );
  }

  private getWorkMembers(workID: Number){
    this.apiService.Get('work/' + workID + "/member").subscribe(
      res => {
        this.workMembers = res as Member[];
        this.getWorkDetails(workID);
      },
      err => this.HandleError(err)
    );
  }

  private getWorkDetails(workID: Number){
    this.apiService.Get('work/' + workID).subscribe(
      res => {
        this.currentWork = res as Work;
        this.currentWork.owner = this.findWorkMember(this.currentWork.ownerID);
      },
      err => this.HandleError(err)
    );

    this.apiService.Get('work/' + workID + "/chat").subscribe(
      res => this.createWorkChat(res as WorkChat[]),
      err => this.HandleError(err)
    );

    this.apiService.Get('work/' + workID + "/tag").subscribe(
      res => this.tags = res as WorkTag[],
      err => this.HandleError(err)
    );

    this.apiService.Get('ticket/work/' + workID + "/open").subscribe(
      res => this.tickets = res as Ticket[],
      err => this.HandleError(err)
    );
  }

  private createWorkChat(workChat: WorkChat[]){

    if(this.workChatDateGroups == null)
     this.workChatDateGroups = new Array<WorkChatDateGroup>();

     if(workChat == null)
      return;

    for(var i = 0; i < workChat.length; i++){
      workChat[i].member = this.findWorkMember(workChat[i].updatedBy);

      var group = this.getWorkChatDateGroup(workChat[i].updatedDate);
      group.add(workChat[i]);
    }
  }

  private getWorkChatDateGroup(date: Date) : WorkChatDateGroup{
    var dateCheck = new Date(date);
    dateCheck.setHours(0,0,0,0);
    for(var i = 0; i < this.workChatDateGroups.length; i++){
      if(dateCheck === this.workChatDateGroups[i].date)
        return this.workChatDateGroups[i];
    }

    var newGroup = new WorkChatDateGroup(dateCheck);
    this.workChatDateGroups.push(newGroup);
    return newGroup;
  }

  private findWorkMember(memberID: Number) : Member{
    if(this.workMembers == null) return null;
    for(var i = 0; i < this.workMembers.length; i++){
      if(this.workMembers[i].memberID === memberID)
        return this.workMembers[i];
    }
    return null;
  }

  private HandleError(err) {
    if (err.status === 401) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
