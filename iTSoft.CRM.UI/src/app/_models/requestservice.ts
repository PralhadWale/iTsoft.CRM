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
    ServiceQuotedPrice : number;
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
    ServiceTotalQuotedPrice : number;
    ServiceTotalQuotedDiscountPercent: number | null;
    ServiceTotalQuotedDicountAmount: number | null;
    ServiceTotalQuotedNetAmount: number | null;
    ServiceTotalAgreedDiscountPercent: number | null;
    ServiceTotalAgreedDiscountAmount: number | null;
    ServiceTotalAgreedNetAmount: number | null;
    public constructor() {
        super();
        this.ServiceName = '';
        this.ServiceId = 0;
        this.Remark = '';
    }

    Reset()
    {
        this.Quantity = 0;
        this.ServiceQuotedPrice = 0;
        this.ServiceQuotedDiscountPercent = 0;
        this.ServiceQuotedDicountAmount = 0;
        this.ServiceQuotedNetAmount =0;
        this.ServiceAgreedDiscountPercent=0;
        this.ServiceAgreedDiscountAmount=0;
        this.ServiceAgreedNetAmount=0;
        this.ServiceTotalQuotedPrice=0;
        this.ServiceTotalQuotedDiscountPercent=0;
        this.ServiceTotalQuotedDicountAmount=0;
        this.ServiceTotalQuotedNetAmount=0;
        this.ServiceTotalAgreedDiscountPercent=0;
        this.ServiceTotalAgreedDiscountAmount=0;
        this.ServiceTotalAgreedNetAmount=0;
    }

    Calculate(fromQuotation : boolean) {
      
        this.NoOfEmployees =  this.NoOfEmployees != null && this.NoOfEmployees > 0 ? this.NoOfEmployees : 1;
        this.Quantity = this.NoOfEmployees;

        this.ServiceQuotedDicountAmount = Math.round((this.ServiceQuotedDiscountPercent / 100) * this.ServiceQuotedPrice); 
        this.ServiceQuotedNetAmount = this.ServiceQuotedPrice - this.ServiceQuotedDicountAmount;

        this.ServiceTotalQuotedPrice= this.ServiceQuotedPrice * this.Quantity;
        this.ServiceTotalQuotedDiscountPercent= this.ServiceTotalQuotedDiscountPercent;
        this.ServiceTotalQuotedDicountAmount=this.ServiceQuotedDicountAmount * this.Quantity;
        this.ServiceTotalQuotedNetAmount=this.ServiceQuotedNetAmount * this.Quantity;

        if (fromQuotation) {
           
            this.ServiceAgreedDiscountAmount = Math.round((this.ServiceAgreedDiscountPercent / 100) * this.ServiceQuotedPrice);
            this.ServiceAgreedNetAmount = this.ServiceQuotedPrice - this.ServiceAgreedDiscountAmount;
            
            this.ServiceTotalAgreedDiscountPercent = this.ServiceAgreedDiscountPercent;
            this.ServiceTotalAgreedDiscountAmount = this.ServiceAgreedDiscountAmount * this.Quantity;
            this.ServiceTotalAgreedNetAmount = this.ServiceAgreedNetAmount * this.Quantity;
        }
    }
}