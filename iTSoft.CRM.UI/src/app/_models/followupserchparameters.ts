import { RequestType } from './requesttype';

export class FollowUpSerchParameters
{
    RequestTypeId: number;
    RequestNo: string;
    FromDate: Date | string;
    ToDate: Date | string;
    CustomerName: string;
    CompanyName: string;
    PhoneNo: string;
    Email: string;
    SourceId: number;
    LeadStatusId: number;
    StageId: number;
    Amount: number;
    ClientBehaviourId: number;
    AdvisorId: number;
    IsCompleted  : boolean;
    UserId: number;
    constructor() {
        //this.RequestTypeId = RequestType.Enquiry;
        var todaysDate = new Date();
        this.FromDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
        this.ToDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0);
    }
}