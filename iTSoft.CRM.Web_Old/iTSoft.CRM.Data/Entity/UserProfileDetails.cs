using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class UserProfileDetails : BaseModel
    {
        public long UserId { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string UserName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PAN { get; set; }
        public long AccountId { get; set; }
        public string AccountNo { get; set; }
        public string IFSCCode { get; set; }
        public string BankBranchName { get; set; }
        public string BankName { get; set; }
        public long RoleId { get; set; }
    }
}
