using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Process
{
    [Table("RequestMaster")]
    public class RequestMaster
    {
        [Key]
        public long RequestId { get; set; }
        public long? ParentRequestId { get; set; }
        public long? RequestTypeId { get; set; }
        public string RequestNo { get; set; }
        public DateTime? RequestDate { get; set; }
        public long? OrganizationId { get; set; }
        public long? ClientId { get; set; }
        public long? ClientTypeId { get; set; }
        public long? SourceId { get; set; }
        public decimal? Amount { get; set; }
        public decimal? AgreedAmount { get; set; }
        public decimal? RevenueAmount { get; set; }
        public string TermsAndCondition { get; set; }
        public long? ClientBehaviourId { get; set; }
        public long? AdvisorId { get; set; }
        public DateTime? AssignedOn { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public long? StatusId { get; set; }

    }

}
