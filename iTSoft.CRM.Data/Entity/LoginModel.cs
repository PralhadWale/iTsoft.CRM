using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public long RoleId { get; set; }
        public long UserID { get; set; }
        public string UserName { get; set; }
        public string NewPassword { get; internal set; }
        public string OTP { get; internal set; }
    }
}
