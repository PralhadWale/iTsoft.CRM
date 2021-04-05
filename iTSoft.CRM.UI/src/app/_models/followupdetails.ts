import { FollowUp } from './followup';
import { RequestMaster } from './request';

export class FollowUpDetails extends FollowUp
{
    FinancialYear : string;
    DepartmentName : string;
    RequestTypeId: number;
    RequestNo : string;
    ClientTypeName : string;
    OrganizationTypeName: string;
    ClientName : string;
    PANNo:string;
    GSTNo:string;
    PhoneNo1:string;
    PhoneNo2:string;
    LeadSourceName: string;
    LeadStatusName: string;
    StageName: string;
    AdvisorName: string;
    ClientBehaviourName: string;
    RequestTypeName: string;
    TransferWithRequest:boolean;
    DepartmentId:number;
  

    
}