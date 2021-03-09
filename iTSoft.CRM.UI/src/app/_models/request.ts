export class RequestMaster
{
    RequestId: number;

    RequestTypeId: number;

    RequestNo: string;

    RequestDate: Date ;

    Title: string;

    CustomerName: string;

    LastName: string;

    FirstName: string;

    MiddleName: string;

    CompanyName: string;

    Website: string;

    Designation: string;

    PhoneNo1: string;

    PhoneNo2: string;

    Email: string;

    DOB: Date ;

    SourceId: number;

    LeadStatusId: number;

    StageId: number;

    StateId: number;

    CityId: number;

    Address: string;

    TermsAndCondition: string;

    Amount: number;

    AgreedAmount : number;
    
    RevenueAmount:number;

    ClientBehaviourId: number;

    DepartmentId : number;

    AdvisorId: number;

    AssignedOn: Date ;

    AddedBy: number;

    AddedOn: Date ;

    UpdatedBy: number;

    UpdatedOn: Date ;

    ClientId: number;

    constructor(){
        this.RequestDate = new Date();
        this.AddedOn = new Date();
        this.UpdatedOn = new Date();
        // this.LeadStatusId = 1;
        // this.SourceId = 1;
        // this.StageId = 1;
    }
}
