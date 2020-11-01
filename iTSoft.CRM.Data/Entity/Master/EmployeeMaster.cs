using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    public class EmployeeMaster : BaseModel
    {
        public long EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string MobileNo1 { get; set; }
        public string MobileNo2 { get; set; }
        public string EmailId { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string PostalCode { get; set; }
        public string AadharNo { get; set; }
        public string UniqueID { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
        public bool? IsActive { get; set; }
        public decimal TargetAmount { get; set; }
    }
}
