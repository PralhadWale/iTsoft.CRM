using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.ViewModel
{
    public class AssignAdvisorViewModel
    {
        public long? RequestId { get; set; }
        public long? RequestServiceId { get; set; }
        public long? FollowUpId { get; set; }
        public long? AdvisorId { get; set; }
        public long? DepartmentId { get; set; }
        public long? UpdatedBy { get; set; }
        public bool TransferPendingFollowUp { get; set; }
        public bool TransferWithRequest { get; set; }

    }
}
