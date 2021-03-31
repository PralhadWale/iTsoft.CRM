export class RequestMaster
{
    RequestId: number;
    ParentRequestId?: number;
    RequestTypeId?: number;
    Subject : string;
    Message : string;
    RequestNo: string;
    RequestDate?: Date;
    OrganizationId?: number;
    ClientId?: number;
    ClientTypeId: string;
    SourceId?: number;
    Amount?: number;
    AgreedAmount?: number;
    RevenueAmount?: number;
    TermsAndCondition: string;
    ClientBehaviourId?: number;
    AdvisorId?: number;
    StatusId : number;
    AssignedOn?: string;
    AddedBy?: number;
    AddedOn?: Date;
    UpdatedBy?: number;
    UpdatedOn?: Date;


    constructor(){
        this.RequestDate = new Date();
        this.AddedOn = new Date();
        this.UpdatedOn = new Date();
        // this.LeadStatusId = 1;
        // this.SourceId = 1;
        // this.StageId = 1;
    }
}
