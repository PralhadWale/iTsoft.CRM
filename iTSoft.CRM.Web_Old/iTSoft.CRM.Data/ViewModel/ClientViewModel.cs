using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.ViewModel
{
    public class ClientViewModel
    {
        public ClientMaster ClientMaster { get; set; }
        public OrganizationMaster OrganizationMaster { get; set; }
        public List<ContactPersonMaster> ContactPersonMasters { get; set; }
    }
}
