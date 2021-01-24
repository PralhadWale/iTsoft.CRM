using iTSoft.CRM.Data.Entity.Process;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class RequestDetails : RequestMaster
    {
        public string LeadSourceName { get; set; }
        public string LeadStatusName { get; set; }
        public string StageName { get; set; }
        public string AdvisorName { get; set; }
        public string ClientBehaviourName { get; set; }
        public string Department { get; set; }

    }

}
