export class RequestSerchParameters
{
    RequestTypeId: number;
    RequestNo: string;
    FromDate: Date;
    ToDate: Date;
    CustomerName: string;
    CompanyName: string;
    PhoneNo: string;
    Email: string;
    SourceId: number;
    LeadStatusId: number;
    StageId: number;
    Amount: number;
    ClientBehaviourId: number;

    constructor(requestTypeId : number) {
        this.RequestTypeId = requestTypeId;
        var todaysDate = new Date();
        this.FromDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
        this.ToDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth() + 1, 0);
    }
}