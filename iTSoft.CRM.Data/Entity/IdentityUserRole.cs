using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class IdentityUserRole : BaseModel
    {
        public long UserId { get; set; }
        public long RoleId { get; set; }
        //      public Guid URID { get; set; }
        public long? ApprovedBy { get; set; }
        public DateTime? ApplicableFrom { get; set; }
        //public Guid URID { get; set; }
    }
}
