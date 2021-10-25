using iTSoft.CRM.Data.Entity.Process;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class FollowUpDetails : RequestSummery
    {
        public long FollowUpId { get; set; }
        public string Department{ get; set; }
        public string FinancialYear { get; set; }
        public string LeadSourceName { get; set; }
        public string StageName { get; set; }
        public string RequestTypeName { get; set; }
        public string Remark { get; set; }
        public DateTime FollowUpDate { get; set; }
        public int NoOfEmployees { get; set; }
        public int Quantity { get; set; }
        public int Attempt { get; set; }
        public int ClientRating { get; set; }
        public long IsCompleted { get; set; }
        public string ServiceName { get; set; }
        public decimal NextFollowupDate { get; set; }
        public decimal? ServiceQuotedPrice { get; set; }
        public decimal? ServiceQuotedDiscountPercent { get; set; }
        public decimal? ServiceQuotedDicountAmount { get; set; }
        public decimal? ServiceQuotedNetAmount { get; set; }
        public decimal? ServiceAgreedDiscountPercent { get; set; }
        public decimal? ServiceAgreedDiscountAmount { get; set; }
        public decimal? ServiceAgreedNetAmount { get; set; }

        public decimal? ServiceTotalQuotedPrice { get { return ServiceQuotedPrice * Quantity; } }
        public decimal? ServiceTotalQuotedDiscountPercent { get { return ServiceQuotedDiscountPercent * Quantity; } }
        public decimal? ServiceTotalQuotedDicountAmount { get { return ServiceQuotedDicountAmount * Quantity; } }
        public decimal? ServiceTotalQuotedNetAmount { get { return ServiceQuotedNetAmount * Quantity; } }
        public decimal? ServiceTotalAgreedDiscountPercent { get { return ServiceAgreedDiscountPercent * Quantity; } }
        public decimal? ServiceTotalAgreedDiscountAmount { get { return ServiceAgreedDiscountAmount * Quantity; } }
        public decimal? ServiceTotalAgreedNetAmount { get { return ServiceAgreedNetAmount * Quantity; } }

    }
}
