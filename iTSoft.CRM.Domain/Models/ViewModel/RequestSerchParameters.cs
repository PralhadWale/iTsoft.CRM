using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class RequestSerchParameters
    {
        public string RequestTypeId { get; set; }
        public string RequestNo { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string CustomerName { get; set; }
        public string CompanyName { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public long SourceId { get; set; }
        public long LeadStatusId { get; set; }
        public long StageId { get; set; }
        public decimal Amount { get; set; }
        public long ClientBehaviourId { get; set; }
    }
}
