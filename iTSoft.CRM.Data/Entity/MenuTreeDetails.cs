using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class MenuTreeDetails
    {
        public long MenuIdentity { get; set; }
        public long MenuId { get; set; }
        public long? ParentMenuId { get; set; }
        public string MenuName { get; set; }
        public bool HasChildren { get; set; }
        public bool ISChecked { get; set; }
        public string ModuleName { get; set; }
        public long ModuleID { get; set; }
    }
}
