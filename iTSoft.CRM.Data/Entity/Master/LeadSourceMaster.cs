using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    [Table("LeadStatusMaster")]
    public class LeadSourceMaster
    {
        [Key]
        public long? LeadSourceId { get; set; }
        public string LeadSourceName { get; set; }
        public bool? IsActive { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
