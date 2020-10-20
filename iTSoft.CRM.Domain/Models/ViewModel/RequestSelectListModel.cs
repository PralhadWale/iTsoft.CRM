using iTSoft.CRM.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
   public class RequestSelectListModel
    {
        public List<ListModel> LeadStatuses { get; set; }
        public List<ListModel> Stages { get; set; }
        public List<ListModel> Sources { get; set; }
        public List<ListModel> ClientBehaviour { get; set; }
    }
}
