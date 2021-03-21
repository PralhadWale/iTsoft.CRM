using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class RequestSummery
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

        public long? ClientBehaviourId { get; set; }

        public long? AddedBy { get; set; }

        public DateTime? AddedOn { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public DateTime? AssignedOn { get; set; }

        public string ClientBehaviourName { get; set; }

        public string AdvisorName { get; set; }

        public decimal? AgreedAmount { get; set; }

        public decimal? RevenueAmount { get; set; }

        public long? ClientTypeId { get; set; }

        public string Subject { get; set; }

        public long? ClientId { get; set; }

        public long? OrganizationId { get; set; }

        public decimal? Amount { get; set; }

        public long? StatusId { get; set; }

        public long LeadStatusId { get; set; }

        public string LeadStatusName { get; set; }
    }
}
