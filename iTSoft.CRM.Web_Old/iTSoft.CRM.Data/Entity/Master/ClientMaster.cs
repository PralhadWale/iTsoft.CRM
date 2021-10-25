using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    public class ClientMaster
    {
        public long ClientId { get; set; }
        public long? OrganizationId { get; set; }
        public long? ClientTypeId { get; set; }
        public long? ClientSourceId { get; set; }
        public bool? IsDND { get; set; }
        public string LoginName { get; set; }
        public string Password { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedOn { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public long? AdvisorId { get; set; }

    }
}
