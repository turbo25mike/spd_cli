import {Model} from './base.model';

export class Member extends Model
{
    memberID: number;
    loginID : string;
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    name: string;
    nickname: string;
    picture: string;

    static fromJSON(obj: Member): Member {
        var w = new Member();
        w.memberID = obj.memberID;
        w.loginID = obj.loginID;
        w.email = obj.email;
        w.email_verified = obj.email_verified;
        w.family_name = obj.family_name;
        w.given_name = obj.given_name;
        w.name = obj.name;
        w.nickname = obj.nickname;
        w.picture = obj.picture;
        return w;
    }
}
