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
        public long? RequestId { get; set; }

        public long? RequestTypeId { get; set; }

        public string RequestNo { get; set; }

        public DateTime? RequestDate { get; set; }

        public string Title { get; set; }

        public string CustomerName { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string CompanyName { get; set; }

        public string Website { get; set; }

        public string Designation { get; set; }

        public string PhoneNo1 { get; set; }

        public string PhoneNo2 { get; set; }

        public string Email { get; set; }

        public DateTime? DOB { get; set; }

        public long? SourceId { get; set; }

        public long? LeadStatusId { get; set; }

        public long? StageId { get; set; }

        public long? StateId { get; set; }

        public long? CityId { get; set; }

        public long? DepartmentId { get; set; }

        public string Address { get; set; }

        public string TermsAndCondition { get; set; }

        public decimal? Amount { get; set; }

        public long? ClientBehaviourId { get; set; }

        public long? AdvisorId { get; set; }

        public DateTime? AssignedOn { get; set; }

        public long? AddedBy { get; set; }

        public DateTime? AddedOn { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

    }

}
