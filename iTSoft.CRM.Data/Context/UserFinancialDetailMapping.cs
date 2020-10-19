using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserFinancialDetailMapping
    {
        [Key]
        public long UserFinancialDetailMappingId { get; set; }
        public long? FinancialDetailsId { get; set; }
        public long? UserFinancialId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(FinancialDetailsId))]
        [InverseProperty("UserFinancialDetailMapping")]
        public virtual FinancialDetails FinancialDetails { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.UserFinancialDetailMapping))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
