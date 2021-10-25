using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class BaseModel
    {
        //public Int64? AddedBy { get; set; }
        //public Int64? UpdatedBy { get; set; }
        public long? AddedBy { get; set; }
        public DateTime? AddedDate { get; set; }
        public long? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string ComputerName = Environment.MachineName;
    }
}
