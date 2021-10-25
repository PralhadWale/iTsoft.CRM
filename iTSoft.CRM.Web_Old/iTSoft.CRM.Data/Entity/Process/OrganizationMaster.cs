using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Process
{
    public class OrganizationMaster
    {
        public long OrganizationId { get; set; }
        public int? OrganizationTypeId { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationCode { get; set; }
        public string Description { get; set; }
        public long? TariffId { get; set; }
        public string Website { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }
        public string IndustryType { get; set; }
        public long? TotalEmployees { get; set; }
        public string PANNO { get; set; }
        public string GSTNO { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? AddedBy { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

    }


    public class OrganizationMasterVM : OrganizationMaster
    {

    }

}
