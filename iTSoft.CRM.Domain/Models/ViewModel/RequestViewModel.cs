using iTSoft.CRM.Data.Entity.Process;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class RequestViewModel
    {
        public RequestMaster RequestMaster { get; set; }
        public List<RequestServiceMaster> RequestServiceMasters { get; set; }
        public List<RequestServiceDetails> RequestServiceDetails { get; set; }
        public List<FollowUpDetails> RequestFollowup { get; set; }
    }

}
