import {Model} from './base.model';

export class Org extends Model
{
    OrgID: number;
    Name: string;
    BillingID: number;
}

export class OrgBilling extends Model
{
    OrgBillingID: number;
    OrgID: number;
    AmountDue: number;
    DateDue: Date;
    BillingMonth: number;
    BillingYear: number;

}
export class OrgCc extends Model
{
    OrgCCID: number;
    OrgID: number;
    CreditCardNumber: number;
}

export class OrgMember extends Model
{
    OrgMemberID: number;
    OrgID: number;
    MemberID: number;
}
