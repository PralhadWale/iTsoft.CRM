using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class IdentityRole : BaseModel
    {
        [Key]
        public Int64 RoleId { get; set; }
        public string Name { get; set; }
        public int ISSeller { get; set; }
        public int ISParty { get; set; }
    }
}
