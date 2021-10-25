using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    [Table("EmailMaster")]
    public class EmailMaster
    {

        [Key]
        public long EmailId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int? SMTPSettingId { get; set; }

        public long? AddedBy { get; set; }

        public DateTime? AddedDate { get; set; }

        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

    }

}
