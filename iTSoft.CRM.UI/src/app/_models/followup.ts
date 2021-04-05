export class FollowUp {
    FollowUpId: number;
    RequestId: number;
    RequestServiceId : number;
    FollowUpDate: Date;
    NextFollowupDate : Date;
    NoOfEmployees: number;
    Quantity : number;
    ServiceQuotedPrice : number;
    ServiceQuotedDiscountPercent: number;
    ServiceQuotedDicountAmount: number;
    ServiceQuotedNetAmount: number;
    ServiceAgreedDiscountPercent: number;
    ServiceAgreedDiscountAmount: number;
    ServiceAgreedNetAmount: number;
    ServiceName : string;
    LeadStatusId: number;
    StageId: number;
    Remark: string;
    Attempt: string;
    ClientRating: number;
    AddedBy: number;
    AddedOn: Date;
    UpdatedBy: number;
    UpdatedOn: Date;
    AdvisorId:number;
    IsCompleted:boolean;
   
}