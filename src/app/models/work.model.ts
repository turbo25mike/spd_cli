import {Model} from './base.model';
import { Member } from './member.model';


export class Work extends Model
{
    modelType: string = 'Work';

    orgName: string;
    workID: number;
    parentWorkID: number;
    orgID: number;
    title: string;
    status: string;
    ownerID: number;
    size: number;
    priority: number;
    hoursWorked: number;
    startDate: Date;
    completeDate: Date;

    children: Work[];
    members: Member[];
    tags: WorkTag[];

    parentWorkTitle: string;
    showChildren: boolean;
    owner: Member;

    optionMap: string = '-pwid parentWorkID -t title -d description -o owner -s size -p priority -h hoursWorked -std startDate -cd completeDate';

    mapFromJSON(obj: Work) {
        if(obj == null) return;
        this.orgName = obj.orgName;
        this.title = obj.title;
        this.status = obj.status;
        this.ownerID = obj.ownerID;
        this.size = obj.size;
        this.priority = obj.priority;
        this.startDate = obj.startDate;
        this.completeDate = obj.completeDate;
    }

    static fromJSONArray(array: Array<Work>): Work[] {
      return array.map(obj => {
        var w = new Work();
        w.orgName = obj.orgName;
        w.workID = obj.workID;
        w.parentWorkID = obj.parentWorkID;
        w.orgID = obj.orgID;
        w.title = obj.title;
        w.status = obj.status;
        w.ownerID = obj.ownerID;
        w.size = obj.size;
        w.priority = obj.priority;
        w.startDate = obj.startDate;
        w.completeDate = obj.completeDate;
        w.children = Work.fromJSONArray(obj.children);
        w.tags = new Array<WorkTag>();
        return w;
      });
    }
}

export class WorkBreadCrumb
{
    workID: number;
    title: string;
}

export class WorkMember extends Model
{
    modelType: string = 'WorkMember';
    workMemberID: number;
    workID: number;
}

export class WorkChatDateGroup
{
  constructor(date: Date){
    this.date = date;
  }
  date: Date;
  chatList: WorkChat[];

  public add(chat: WorkChat){
    if(this.chatList == null)
      this.chatList = new Array<WorkChat>();
    this.chatList.push(chat);
  }
}

export class WorkChat extends Model
{
    modelType: string = 'WorkChat';
    workChatID: number;
    workID: number;
    message: string;
    member: Member;
}

export class WorkTag extends Model
{
    modelType: string = 'WorkTag';
    workTagID: number;
    workID: number;
    title: string;
    value: string;
    color: string;
}

export class Ticket extends Model
{
    ticketID: string = 'Ticket';
    resolved: boolean;
    status: string;
    chatList: TicketChat[];
}

export class TicketChat extends Model
{
    ticketChatID: string = 'TicketChat';
    workID: number;
    message: string;
    member: Member;
}
