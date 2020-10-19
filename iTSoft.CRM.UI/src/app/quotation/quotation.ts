import { QuotationModule } from './quotation.module';

/* Defines the customer entity */
export interface Quotation {
  Quotationid: number;
  QuotationNo: string;
  QuotationDate: Date;
  Name: string;
  PhoneNo: string;
  Email: string;
  CompanyName: string;
  SourceId: number;
  Amount: number;
  TermsAndCondition: string;
  QuotationStatusId: number;
}

export interface QuotationDetails extends QuotationModule {
  Source: string;
  QuotationStatus:string;
  Stage:string;
}
