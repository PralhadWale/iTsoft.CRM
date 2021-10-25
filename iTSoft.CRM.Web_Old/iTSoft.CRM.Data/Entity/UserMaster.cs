using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class UserMaster : BaseModel
    {
        public long UserId { get; set; }
        public bool IsEmployee { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string Email { get; set; }
        public long OCode { get; set; }
        public Guid URID { get; set; }
    }

    public class UserMasterView
    {
        public long AssignTo { get; set; }
        public string UserName { get; set; }

        public string AdvisorName { get; set; }//For Client Header Show
    }
}
