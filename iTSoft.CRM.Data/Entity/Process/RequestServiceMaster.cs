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


    }


    public class RequestServiceDetails
    {
        public string ServiceName { get; set; }
    }
}
