using System;
using System.Collections.Generic;
using System.Text;


namespace iTSoft.CRM.Domain.Models
{
    public class UserDetailsViewModel
    {
        public long? UserId { get; set; }
        public string Fname { get; set; }
        public string? Mname { get; set; }
        public string Lname { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string UserPan { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public long? CompanyId { get; set; }
        public long CompanyFinancialId { get; set; }

    }
}
