import { inherits } from "util";

export class RequestServiceMaster {
    RequestServiceId: number;
    RequestId: number;
    ServiceId: number;
    SourceId : number;
    LeadStatusId: number;
    StageId: number;
    DepartmentId: number;
    Quantity : number;
    NoOfEmployees:number;
    ServiceDiscountType : number;
    FinancialYearId:number;
    ServiceQuotedDiscountPercent: number;
    ServiceQuotedDicountAmount: number;
    ServiceQuotedNetAmount: number;
    ServiceAgreedDiscountPercent: number;
    ServiceAgreedDiscountAmount: number;
    ServiceAgreedNetAmount: number;
    ParentRequestId: number;
    ParentRequestServiceId : number;
    Remark: string;
    TermsAndConditions: string;
    AdvisorId: number;
    LastFollowupDate: Date | string | null;
    NextFollowupDate: Date | string | null;

    constructor() {

    }
}


export class RequestServiceDetails extends RequestServiceMaster {
    FinancialYear : string;
    DiscountType : string;
    ServiceName: string;
    LeadStatusName: string;
    LeadSourceName:string;
    DepartmentName: string;
    StageName: string;
    Attempts: number;
    AdvisorName: string;
    CompletedOn: Date | string | null;
    AssignedOn: Date | string | null;
    RelatedRequestNo : string;
    RelatedRequestId : number;
    public constructor() {
        super();
        this.ServiceName = '';
        this.ServiceId = 0;
        this.Remark = '';
    }
}