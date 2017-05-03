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
    description: string;
    owner: number;
    size: number;
    priority: number;
    hoursWorked: number;
    startDate: Date;
    completeDate: Date;

    children: Work[];
    members: Member[];
    tags: Tag[];
    status: WorkStatus;

    parentWorkTitle: string;
    showChildren: boolean;

    optionMap: string = '-pwid parentWorkID -t title -d description -o owner -s size -p priority -h hoursWorked -std startDate -cd completeDate';

    static fromJSONArray(array: Array<Work>): Work[] {
      return array.map(obj => {
        var w = new Work();
        w.orgName = obj.orgName;
        w.workID = obj.workID;
        w.parentWorkID = obj.parentWorkID;
        w.orgID = obj.orgID;
        w.title = obj.title;
        w.description = obj.description;
        w.owner = obj.owner;
        w.size = obj.size;
        w.priority = obj.priority;
        w.startDate = obj.startDate;
        w.completeDate = obj.completeDate;
        w.children = Work.fromJSONArray(obj.children);
        w.tags = new Array<Tag>();
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

export class WorkTag extends Model
{
    modelType: string = 'WorkTag';
    workTagID: number;
    workID: number;
    tagID: number;
    tagName: string;
}

export class WorkStatus extends Model
{
    modelType: string = 'WorkStatus';
    workStatusID: number;
    workID: number;
    description: string;
}

export class Tag extends Model
{
    modelType: string = 'Tag';
    tagID: number;
    name: string;
}
