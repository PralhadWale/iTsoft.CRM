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

        public long? SourceId { get; set; }

        public long? ClientBehaviourId { get; set; }

        public long? AddedBy { get; set; }

        public DateTime? AddedOn { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public string LeadSourceName { get; set; }

        public string LeadStatusName { get; set; }

        public string StageName { get; set; }

        public string AdvisorName { get; set; }

        public DateTime? AssignedOn { get; set; }

        public DateTime? LastFollowupDate { get; set; }

        public DateTime? NextFollowupDate { get; set; }

        public string ClientBehaviourName { get; set; }

        public string DepartmentName { get; set; }

        public string ServiceName { get; set; }

        public long? ServiceId { get; set; }

        public long? DepartmentId { get; set; }

        public long? LeadStatusId { get; set; }

        public decimal? ServiceRate { get; set; }

        public decimal? ServiceAgreedRate { get; set; }

        public string Remark { get; set; }

        public long? StageId { get; set; }

        public string TermsAndConditions { get; set; }

        public long? AdvisorId { get; set; }

        public long RequestServiceId { get; set; }

        public decimal? QuoatedPrice { get; set; }

        public decimal? AgreedPrice { get; set; }

        public decimal? RevenueAmount { get; set; }

        public long? ClientTypeId { get; set; }


    }

}
