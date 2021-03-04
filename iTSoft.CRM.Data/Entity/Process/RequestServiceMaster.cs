using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Process
{
    [Table("RequestServiceMaster")]
    public class RequestServiceMaster
    {
        [Key]
        public long RequestServiceId { get; set; }
        public long? RequestId { get; set; }
        public long? ServiceId { get; set; }
        public decimal? QuoatedPrice { get; set; }
        public decimal? AgreedPrice { get; set; }
        public string Remark { get; set; }
        public long LeadStatusId { get; set; }
    }


    public class RequestServiceDetails : RequestServiceMaster
    {
        public string ServiceName { get; set; }
        public string LeadStatusName { get; set; }
    }
}
