using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public long OCode { get; set; }
        public long RoleId { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
        public long UserID { get; set; }
        public string UserName { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string NewPassword { get; set; }
        public string FullName { get; set; }
        public string OTP { get; set; }
        public string ApplicationToken { get; set; }
        public byte[] EmpPhoto { get; set; }

    }
}
