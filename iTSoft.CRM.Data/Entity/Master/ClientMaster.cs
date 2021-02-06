using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    public class ClientMaster
    {
        public long ClientId { get; set; }
        public int? GenderId { get; set; }
        public string ClientName { get; set; }
        public long? OrganizationId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? DoB { get; set; }
        public string FatherFirstName { get; set; }
        public string FMiddleName { get; set; }
        public string FLastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string PinCode { get; set; }
        public string Remark { get; set; }
        public string MobileNo { get; set; }
        public string AlternateMobileNo { get; set; }
        public string ContactPerson { get; set; }
        public string LandLine { get; set; }
        public string GSTNO { get; set; }
        public string AdharNo { get; set; }
        public string LoginName { get; set; }
        public string PANNo { get; set; }
        public string HNo { get; set; }
        public string Street { get; set; }
        public string Area { get; set; }
        public string Taluka { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string OfficeAddress { get; set; }
        public string OfficeHNo { get; set; }
        public string OfficeStreet { get; set; }
        public string OfficeArea { get; set; }
        public string OfficeTaluka { get; set; }
        public string OfficeDistrict { get; set; }
        public string OfficeState { get; set; }
        public string OfficePinCode { get; set; }
        public string Password { get; set; }
        public Byte[] ProfilePhoto { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string CorporateName { get; set; }
    }
}
