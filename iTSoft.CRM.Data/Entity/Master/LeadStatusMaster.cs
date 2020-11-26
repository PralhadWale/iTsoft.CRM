using System;
using System.Collections.Generic;
using System.Text;
using Dapper.Contrib.Extensions;
namespace iTSoft.CRM.Data.Entity.Master
{
    [Table("LeadStatusMaster")]
    public class LeadStatusMaster
    {
        [Key]
        public long LeadStatusId { get; set; }
        public string LeadStatusName { get; set; }
        public bool? IsActive { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
