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

    optionMap: string = '-pwid parentWorkID -t title -d description -o owner -s size -p priority -h hoursWorked -std startDate -cd completeDate';

    children: Work[];
    members: Member[];
    tags: Tag[];
    status: WorkStatus;
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
    name: number;
}
