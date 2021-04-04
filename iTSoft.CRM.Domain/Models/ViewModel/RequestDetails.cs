using iTSoft.CRM.Data.Entity.Process;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class RequestDetails 
    {
        public string ClientTypeName { get; set; }
       public string OrganizationTypeName { get; set; }
        public string ClientName { get; set; }
        public string Designation { get; set; }
        public string PhoneNo1 { get; set; }
        public string PhoneNo2 { get; set; }
        public string Email { get; set; }
        public string PANNO { get; set; }
        public long RequestId { get; set; }
        public long? RequestTypeId { get; set; }
        public string RequestNo { get; set; }
        public DateTime? RequestDate { get; set; }
        public long? AdvisorId { get; set; }
        public long RequestServiceId { get; set; }
        public long? SourceId { get; set; }
        public long? ClientBehaviourId { get; set; }
        public string ServiceName { get; set; }
        public string FinancialYear { get; set; }
        public string DiscountType { get; set; }
        public string LeadSourceName { get; set; }
        public string LeadStatusName { get; set; }
        public string StageName { get; set; }
        public string AdvisorName { get; set; }
        public DateTime? AssignedOn { get; set; }
        public DateTime? LastFollowupDate { get; set; }
        public DateTime? NextFollowupDate { get; set; }
        public string ClientBehaviourName { get; set; }
        public string DepartmentName { get; set; }
        public decimal? ServiceQuotedPrice { get; set; }
        public long? ServiceDiscountType { get; set; }
        public decimal? ServiceQuotedDiscountPercent { get; set; }
        public decimal? ServiceQuotedDicountAmount { get; set; }
        public decimal? ServiceQuotedNetAmount { get; set; }
        public decimal? ServiceAgreedDiscountPercent { get; set; }
        public decimal? ServiceAgreedDiscountAmount { get; set; }
        public decimal? ServiceAgreedNetAmount { get; set; }
        public decimal? TotalQuotedAmount { get; set; }
        public decimal? TotalQuotedDiscountAmount { get; set; }
        public decimal? TotalQuotedNetAmount { get; set; }
        public decimal? TotalAgreedDiscountAmount { get; set; }
        public decimal? TotalAgreedNetAmount { get; set; }
        public decimal? RevenueAmount { get; set; }
        public long? ServiceId { get; set; }
        public long? DepartmentId { get; set; }
        public long? LeadStatusId { get; set; }
        public string Remark { get; set; }
        public long? StageId { get; set; }
        public string TermsAndConditions { get; set; }
        public long? ClientTypeId { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }

}
