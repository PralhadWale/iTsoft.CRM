using System;
using System.Collections.Generic;
using Dapper.Contrib.Extensions;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{

    [Table("StageMaster")]
    public class StageMaster
    {
        [Key]
        public long? StageId { get; set; }
        public string StageName { get; set; }
        public bool? IsActive { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }

}
