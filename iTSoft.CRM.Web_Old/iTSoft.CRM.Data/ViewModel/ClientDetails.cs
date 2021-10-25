using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.ViewModel
{
       public  class ClientDetails 
    {

        public long? ClientId { get; set; }
        public long? OrganizationId { get; set; }
        public string ClientName { get; set; }
        public string ClientTypeName { get; set; }
        public long ClientTypeId { get; set; }

        public long ContactPersonId { get; set; }
        public string Salutation { get; set; }

        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Designation { get; set; }
        public string PhoneNo1 { get; set; }
        public string PhoneNo2 { get; set; }
        public int? GenderId { get; set; }
        public string Email { get; set; }
        public DateTime? DOB { get; set; }
        public string PANNO { get; set; }
        public string AadharNo { get; set; }
        public string ContactPersonAddress { get; set; }
        public string ContactPersonDistrict { get; set; }
        public string ContactPersonState { get; set; }
        public string ContactPersonCountry { get; set; }
        public bool? IsActive { get; set; }
        public int? OrganizationTypeId { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationCode { get; set; }
        public string Description { get; set; }
        public long? TariffId { get; set; }
        public string Website { get; set; }
        public string OrganizationEmail { get; set; }
        public string OrganizationMobileNo { get; set; }
        public string OrganizationPhoneNo { get; set; }
        public string OrganizationAddress { get; set; }
        public string OrganizationDistrict { get; set; }
        public string OrganizationState { get; set; }
        public string OrganizationCountry { get; set; }
        public string OrganizationPinCode { get; set; }
        public string IndustryType { get; set; }
        public long? TotalEmployees { get; set; }
        public string OrganizationPANNO { get; set; }
        public string GSTNO { get; set; }
        public bool? IsDND { get; set; }
        public long? ClientSourceId { get; set; }
        public long? AdvisorId { get; set; }
        public DateTime? AddedDate { get; set; }
        public bool? IsAssigned { get; set; }
        public string   DepartmentName { get; set; }
        public decimal? Amount { get; set; }
        public  string  AdvisorName { get; set; }
        public string ServiceName { get; set; }
        public string RequestNo { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}
