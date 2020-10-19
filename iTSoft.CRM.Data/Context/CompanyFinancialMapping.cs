using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class CompanyFinancialMapping
    {
        public CompanyFinancialMapping()
        {
            UserFinancialInvestmentCycleMapping = new HashSet<UserFinancialInvestmentCycleMapping>();
            UserInvestmentCycleMapping = new HashSet<UserInvestmentCycleMapping>();
        }

        [Key]
        public long CompanyFinancialId { get; set; }
        public long? CompanyId { get; set; }
        public long? FinancialYearId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(CompanyId))]
        [InverseProperty(nameof(CompanyDetails.CompanyFinancialMapping))]
        public virtual CompanyDetails Company { get; set; }
        [ForeignKey(nameof(FinancialYearId))]
        [InverseProperty(nameof(FinancialYearDetails.CompanyFinancialMapping))]
        public virtual FinancialYearDetails FinancialYear { get; set; }
        [InverseProperty("CompanyFinancial")]
        public virtual ICollection<UserFinancialInvestmentCycleMapping> UserFinancialInvestmentCycleMapping { get; set; }
        [InverseProperty("CompanyFinancial")]
        public virtual ICollection<UserInvestmentCycleMapping> UserInvestmentCycleMapping { get; set; }
    }
}
