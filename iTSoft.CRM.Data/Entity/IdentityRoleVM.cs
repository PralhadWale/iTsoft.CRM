using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class IdentityRoleVM : IdentityRole
    {
        public List<IdentityRoleMenu> rolesMenu { get; set; }
    }
}
