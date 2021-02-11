using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class TopNEmployeeDashboardViewModel
    {
        public string EmployeeName { get; set; }
        public decimal TargetAmount { get; set; }
        public decimal RevenueGenerated { get; set; }
    }
}
