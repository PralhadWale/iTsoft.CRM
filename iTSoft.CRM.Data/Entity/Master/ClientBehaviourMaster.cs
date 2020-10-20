using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    [Table("ClientBehaviourMaster")]
    public class ClientBehaviourMaster
    {
        [Key]
        public int ClientBehaviourId { get; set; }

        public string ClientBehaviourName { get; set; }

        public bool? IsActive { get; set; }

        public long? AddedBy { get; set; }

        public DateTime? AddedOn { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedOn { get; set; }

    }

}
