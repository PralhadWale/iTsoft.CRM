using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.ViewModel
{
    public class EmployeeDashboardData
    {
        public decimal TotalExpectedRevenue { get; set; }
        public decimal TotalActualRevenue { get; set; }
        public decimal MonthlyExpectedRevenue { get; set; }
        public decimal MonthlyActualRevenue { get; set; }
        public decimal TodaysExpectedRevenue { get; set; }
        public decimal TodaysActualRevenue { get; set; }
     
    }
}
