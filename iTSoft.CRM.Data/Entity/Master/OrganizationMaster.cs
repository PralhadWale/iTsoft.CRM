using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    public class OrganizationMaster : BaseModel
    {
        public long OrganizationId { get; set; }
        public string OrganizationCode { get; set; }
        public string OrganizationName { get; set; }
        public string Description { get; set; }
        public long? TariffId { get; set; }
        public string Website { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }


    }
    public class OrganizationMasterVM : OrganizationMaster
    {
        public string TariffName { get; set; }
    }
}
