using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Process
{
    [Table("FollowupMaster")]
    public class FollowUpMaster
    {
        [Key]
        public long FollowUpId { get; set; }
        public long? RequestId { get; set; }
        public long? RequestServiceId { get; set; }
        public DateTime? FollowUpDate { get; set; }
        public long? LeadStatusId { get; set; }
        public long? StageId { get; set; }
        public string Remark { get; set; }
        public string Attempt { get; set; }
        public long? ClientRating { get; set; }
        public long? AdvisorId { get; set; }
        public bool IsCompleted { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }

    }

}
