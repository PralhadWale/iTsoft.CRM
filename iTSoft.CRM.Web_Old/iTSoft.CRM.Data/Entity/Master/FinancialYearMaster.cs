using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Master
{
    public class FinancialYearMaster
    {
        public long FinancialYearId { get; set; }
        public string FinancialYear { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public bool? IsActive { get; set; }

    }
}
