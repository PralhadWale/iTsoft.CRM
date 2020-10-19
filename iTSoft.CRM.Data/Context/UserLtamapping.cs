using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    [Table("UserLTAMapping")]
    public partial class UserLtamapping
    {
        [Key]
        public long UserLtaMappingId { get; set; }
        public long? InvestmentSubmissionId { get; set; }
        public long? UserFinancialId { get; set; }
        public long? LtaId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(InvestmentSubmissionId))]
        [InverseProperty(nameof(InvestmentSubmissionDetails.UserLtamapping))]
        public virtual InvestmentSubmissionDetails InvestmentSubmission { get; set; }
        [ForeignKey(nameof(LtaId))]
        [InverseProperty("UserLtamapping")]
        public virtual Lta Lta { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.UserLtamapping))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
