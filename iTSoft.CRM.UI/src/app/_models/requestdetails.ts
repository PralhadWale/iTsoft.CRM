import { RequestMaster } from './request';

export class RequestDetails extends RequestMaster
{
    LeadSourceName: string;
    LeadStatusName: string;
    StageName: string;
    AdvisorName: string;
    ClientBehaviourName: string;
    TransferPendingFollowUp:boolean;
    RequestServiceId: number;
}