using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserInvestmentCycleMapping
    {
        public UserInvestmentCycleMapping()
        {
            UserFinancialInvestmentCycleMapping = new HashSet<UserFinancialInvestmentCycleMapping>();
        }

        [Key]
        public long UserInvestMentmappingId { get; set; }
        public long? InvestmentCycleId { get; set; }
        public long? CompanyFinancialId { get; set; }
        public long? InvestmentCycletypeId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(CompanyFinancialId))]
        [InverseProperty(nameof(CompanyFinancialMapping.UserInvestmentCycleMapping))]
        public virtual CompanyFinancialMapping CompanyFinancial { get; set; }
        [ForeignKey(nameof(InvestmentCycleId))]
        [InverseProperty(nameof(InvestmentCycleDetails.UserInvestmentCycleMapping))]
        public virtual InvestmentCycleDetails InvestmentCycle { get; set; }
        [ForeignKey(nameof(InvestmentCycletypeId))]
        [InverseProperty(nameof(TypeOfInvestmentCycle.UserInvestmentCycleMapping))]
        public virtual TypeOfInvestmentCycle InvestmentCycletype { get; set; }
        [InverseProperty("UserInvestmentMapping")]
        public virtual ICollection<UserFinancialInvestmentCycleMapping> UserFinancialInvestmentCycleMapping { get; set; }
    }
}
