import { RequestMaster } from './request';

export class FollowUpDetails extends RequestMaster
{
    LeadSourceName: string;
    LeadStatusName: string;
    StageName: string;
    AdvisorName: string;
    ClientBehaviourName: string;
    RequestTypeName: string;
    Remark: string;
    FollowUpDate: string;
}