using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class UserMasterVM : UserMaster
    {
        public string UserName { get; set; }
        public bool IsActive { get; set; }
        public string Password { get; set; }
        public List<IdentityUserRole> usrRoles { get; set; }
        public string OTP { get; set; }

    }
}
