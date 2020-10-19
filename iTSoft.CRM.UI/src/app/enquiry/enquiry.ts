/* Defines the order entity */

export interface IEnquiry {
  EnquiryId: number;
  EnquiryNo: string;
  EnquiryDate:Date;
  Title: string;
  Name: string;
  Website: string;
  Address: string;
  Email: string;
  Phone: string;
  CompanyName: string;
  SourceId:number;
  PinCode:string;
  StateId:number;
  CityId:number;
  CliendBaheviourId:number;
  ServiceId: number;
  Amount: number;
  AlterNateNo: string;
  State: string;
  
  DOB:Date;
}

export interface IEnquiryDetails  extends IEnquiry {
  Name: string;
  Email: string;
  Phone: string;
  CompanyName: string;
  Amount: number;
  AlterNateNo: string;
  State: string;
  Title: string;
  Website: string;
  Address: string;
  EnquiryId: number;
  EnquiryNo: string;
  EnquiryDate:Date;
}

export interface IAddress {
  address: string;
  city: string;
  country: string;
  zipcode: string;
}
