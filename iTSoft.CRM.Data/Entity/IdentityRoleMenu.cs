using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class IdentityRoleMenu : BaseModel
    {
        public long RoleId { get; set; }
        public long MenuIdentity { get; set; }
        public long? ApprovedBy { get; set; }
        public DateTime? ApplicableFrom { get; set; }
    }
}
