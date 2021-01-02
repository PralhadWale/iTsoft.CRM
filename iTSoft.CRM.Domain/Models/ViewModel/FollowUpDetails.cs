using iTSoft.CRM.Data.Entity.Process;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class FollowUpDetails : RequestMaster
    {
        public string LeadSourceName { get; set; }
        public string LeadStatusName { get; set; }
        public string StageName { get; set; }
        public string AdvisorName { get; set; }
        public string ClientBehaviourName { get; set; }
        public string RequestTypeName { get; set; }
        public string Remark { get; set; }
        public DateTime FollowUpDate { get; set; }
        public int Attempt { get; set; }
        public int ClientRating { get; set; }
        public long FollowUpId { get; set; }
        public long IsCompleted { get; set; }

    }
}
