import { RequestMaster } from './request';

export class FollowUpDetails extends RequestMaster
{
    FollowUpId : number;
    FollowUpDate: Date;
    LeadSourceName: string;
    LeadStatusName: string;
    StageName: string;
    AdvisorName: string;
    ClientBehaviourName: string;
    RequestTypeName: string;
    Remark: string;
    Attempt: string;
    ClientRating: number;
    IsCompleted:boolean;
    TransferWithRequest:boolean;
}