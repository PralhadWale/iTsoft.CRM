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
  
    Quantity: number;
    ServiceTotalQuotedPrice : number;
    ServiceTotalQuotedDiscountPercent: number | null;
    ServiceTotalQuotedDicountAmount: number | null;
    ServiceTotalQuotedNetAmount: number | null;
    ServiceTotalAgreedDiscountPercent: number | null;
    ServiceTotalAgreedDiscountAmount: number | null;
    ServiceTotalAgreedNetAmount: number | null;

    Calculate(fromQuotation : boolean) {
      
        this.NoOfEmployees =  this.NoOfEmployees != null && this.NoOfEmployees > 0 ? this.NoOfEmployees : 1;
        this.Quantity = this.NoOfEmployees;

        this.ServiceQuotedDicountAmount = Math.round((this.ServiceQuotedDiscountPercent / 100) * this.ServiceQuotedPrice) 
        this.ServiceQuotedNetAmount = this.ServiceQuotedPrice - this.ServiceQuotedDicountAmount;

        this.ServiceTotalQuotedPrice= this.ServiceQuotedPrice * this.Quantity;
        this.ServiceTotalQuotedDiscountPercent= this.ServiceTotalQuotedDiscountPercent;
        this.ServiceTotalQuotedDicountAmount=this.ServiceQuotedDicountAmount * this.Quantity;
        this.ServiceTotalQuotedNetAmount=this.ServiceQuotedNetAmount * this.Quantity;

        if (fromQuotation) {
           
            this.ServiceAgreedDiscountAmount = Math.round((this.ServiceAgreedDiscountPercent / 100) * this.ServiceQuotedPrice)
            this.ServiceAgreedNetAmount = this.ServiceQuotedPrice - this.ServiceAgreedDiscountAmount;
           
            this.ServiceTotalAgreedDiscountPercent = this.ServiceAgreedDiscountPercent;
            this.ServiceTotalAgreedDiscountAmount = this.ServiceAgreedDiscountAmount * this.Quantity;
            this.ServiceTotalAgreedNetAmount = this.ServiceAgreedNetAmount * this.Quantity;
        }
    }
}