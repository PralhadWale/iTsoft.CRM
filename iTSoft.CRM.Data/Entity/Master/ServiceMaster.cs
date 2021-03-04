using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    [Table("ServiceMaster")]
    public class ServiceMaster
    {
        [Key]
        public long ServiceId { get; set; }

        public long DepartmentId { get; set; }
        public string ServiceName { get; set; }
        public decimal? Price { get; set; }
        public bool? IsActive { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }

    public class ServiceDetails : ServiceMaster
    {
        public string DepartmentName { get; set; }

    }
}
