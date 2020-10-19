using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    [Table("UserHPMapping")]
    public partial class UserHpmapping
    {
        [Key]
        public long UserHpMappingId { get; set; }
        public long? InvestmentSubmissionId { get; set; }
        public long? UserFinancialId { get; set; }
        public long? HpId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(HpId))]
        [InverseProperty("UserHpmapping")]
        public virtual Hp Hp { get; set; }
        [ForeignKey(nameof(InvestmentSubmissionId))]
        [InverseProperty(nameof(InvestmentSubmissionDetails.UserHpmapping))]
        public virtual InvestmentSubmissionDetails InvestmentSubmission { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.UserHpmapping))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
