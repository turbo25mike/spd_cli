import {Model} from './base.model';


export class Work extends Model
{
    OrgName: string;
    WorkID: number;
    ParentWorkID: number;
    OrgID: number;
    Title: string;
    Description: string;
    Owner: number;
    Size: number;
    Priority: number;
    HoursWorked: number;
    StartDate: Date;
    CompleteDate: Date;

    optionMap: string = '-pwid ParentWorkID -t Title -d Description -o Owner -s Size -p Priority -h HoursWorked -std StartDate -cd CompleteDate';
}

export class WorkMember extends Model
{
    WorkMemberID: number;
    WorkID: number;
}

export class WorkTag extends Model
{
    WorkTagID: number;
    WorkID: number;
    TagID: number;
}

export class WorkStatus extends Model
{
    WorkStatusID: number;
    WorkID: number;
    Description: string;
}

export class Tag extends Model
{
    TagID: number;
    Name: number;
}
