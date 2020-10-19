using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class MenuDetails
    {
        public long MenuIdentity { get; set; }
        public long MenuId { get; set; }
        public long? ParentMenuId { get; set; }
        public bool? HasChildren { get; set; }
        public int ModuleId { get; set; }
        public long MenuNumber { get; set; }
        public string MenuName { get; set; }
        public string CSSClass { get; set; }
        public string NgClass { get; set; }
        public string FormLink { get; set; }
        public bool? IsActive { get; set; }
        public List<MenuDetails> Childrens { get; set; }
    }
}
