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
    
    ServiceTotalQuotedPrice : number;
    ServiceTotalQuotedDiscountPercent: number | null;
    ServiceTotalQuotedDicountAmount: number | null;
    ServiceTotalQuotedNetAmount: number | null;
    ServiceTotalAgreedDiscountPercent: number | null;
    ServiceTotalAgreedDiscountAmount: number | null;
    ServiceTotalAgreedNetAmount: number | null;
   
   
}