using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class LeadSourceDashboardViewModel
    {
        public int LeadSourceId { get; set; }
        public string LeadSourceName { get; set; }
        public int LeadsCreated { get; set; }
        public int ConvertedToClients { get; set; }
        public decimal ConversionRateInPercent { get; set; }
    }
}
