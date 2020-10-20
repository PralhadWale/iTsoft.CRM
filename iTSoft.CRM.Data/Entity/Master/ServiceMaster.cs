using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    [Table("ServiceMaster")]
    public class ServiceMaster
    {
        [Key]
        public long? ServiceId { get; set; }
        public string ServiceName { get; set; }
        public bool? IsActive { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
