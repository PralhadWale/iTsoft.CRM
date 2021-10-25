using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Process
{
    public class ContactPersonMaster
    {
        public long ContactPersonId { get; set; }
        public  long? ClientId { get; set; }
        public string Salutation { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string Designation { get; set; }
        public string PhoneNo1 { get; set; }
        public string PhoneNo2 { get; set; }
        public string Email { get; set; }
        public DateTime? DOB { get; set; }
        public string PANNO { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? AddedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

    }

}
