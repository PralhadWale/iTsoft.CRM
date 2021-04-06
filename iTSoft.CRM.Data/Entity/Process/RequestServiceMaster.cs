using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Process
{
    [Table("RequestServiceMaster")]
    public class RequestServiceMaster
    {
        [Key]
        public long RequestServiceId { get; set; }
        public long? RequestId { get; set; }
        public long? ServiceId { get; set; }
        public long? DepartmentId { get; set; }
        public long? NoOfEmployees { get; set; }
        public long? Quantity { get; set; }
        public decimal? ServiceQuotedPrice { get; set; }
        public long? ServiceDiscountType { get; set; }
        public decimal? ServiceQuotedDiscountPercent { get; set; }
        public decimal? ServiceQuotedDicountAmount { get; set; }
        public decimal? ServiceQuotedNetAmount { get; set; }
        public decimal? ServiceAgreedDiscountPercent { get; set; }
        public decimal? ServiceAgreedDiscountAmount { get; set; }
        public decimal? ServiceAgreedNetAmount { get; set; }
        public long? ParentRequestId { get; set; }
        public long? ParentRequestServiceId { get; set; }
        public long? FinancialYearId { get; set; }
        public string Remark { get; set; }
        public long? LeadStatusId { get; set; }
        public long? StageId { get; set; }
        public long? SourceId { get; set; }
        public string TermsAndConditions { get; set; }
        public DateTime? LastFollowupDate { get; set; }
        public DateTime? NextFollowupDate { get; set; }
        public int? Attempts { get; set; }
        public long? AdvisorId { get; set; }
        public DateTime? AssignedOn { get; set; }
        public DateTime? CompletedOn { get; set; }

    }


    public class RequestServiceDetails : RequestServiceMaster
    {
        public string FinancialYear { get; set; }
        public string DiscountType { get; set; }
        public string AdvisorName { get; set; }
        public string ServiceName { get; set; }
        public string DepartmentName { get; set; }
        public string LeadSourceName { get; set; }
        public string LeadStatusName { get; set; }
        public string StageName { get; set; }
        public string RelatedRequestNo { get; set; }
        public long RelatedRequestId { get; set; }
        public decimal? ServiceTotalQuotedPrice { get { return ServiceQuotedPrice * Quantity; } }
        public decimal? ServiceTotalQuotedDiscountPercent { get { return ServiceQuotedDiscountPercent * Quantity; } }
        public decimal? ServiceTotalQuotedDicountAmount { get { return ServiceQuotedDicountAmount * Quantity; } }
        public decimal? ServiceTotalQuotedNetAmount { get { return ServiceQuotedNetAmount * Quantity; } }
        public decimal? ServiceTotalAgreedDiscountPercent { get { return ServiceAgreedDiscountPercent * Quantity; } }
        public decimal? ServiceTotalAgreedDiscountAmount { get { return ServiceAgreedDiscountAmount * Quantity; } }
        public decimal? ServiceTotalAgreedNetAmount { get { return ServiceAgreedNetAmount * Quantity; } }
    }
}
