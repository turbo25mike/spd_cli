import {Model} from './base.model';

export class Org extends Model
{
  modelType: string = 'Org';

    orgID: number;
    name: string;
    billingID: number;
}

export class OrgBilling extends Model
{
    modelType: string = 'OrgBilling';

    orgBillingID: number;
    orgID: number;
    amountDue: number;
    dateDue: Date;
    billingMonth: number;
    billingYear: number;

}
export class OrgCc extends Model
{
    modelType: string = 'OrgCc';

    orgCCID: number;
    orgID: number;
    creditCardNumber: number;
}

export class OrgMember extends Model
{
    modelType: string = 'OrgMember';

    orgMemberID: number;
    orgID: number;
    memberID: number;
}
