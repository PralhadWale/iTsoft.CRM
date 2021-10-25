using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
   public class RevenueTargetDashboardViewModel
    {
        public decimal MonthlyTarget { get; set; }
        public decimal TotalLeadGenerated { get; set; }
        public decimal TotalAchieved { get; set; }
    }
}
