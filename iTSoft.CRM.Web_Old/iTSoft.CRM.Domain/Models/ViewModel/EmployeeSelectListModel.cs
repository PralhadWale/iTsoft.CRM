using iTSoft.CRM.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
   public class EmployeeSelectListModel
    {
        public List<ListModel> Roles { get; set; }
        public List<ListModel> Designations { get; set; }
        public List<ListModel> Departments { get; set; }
        public List<ListModel> Emails { get; set; }
    }
}
