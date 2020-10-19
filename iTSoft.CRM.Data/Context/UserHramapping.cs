using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    [Table("UserHRAMapping")]
    public partial class UserHramapping
    {
        [Key]
        public long UserHraMappingId { get; set; }
        public long? InvestmentSubmissionId { get; set; }
        public long? UserFinancialId { get; set; }
        public long? Hraid { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(Hraid))]
        [InverseProperty("UserHramapping")]
        public virtual Hra Hra { get; set; }
        [ForeignKey(nameof(InvestmentSubmissionId))]
        [InverseProperty(nameof(InvestmentSubmissionDetails.UserHramapping))]
        public virtual InvestmentSubmissionDetails InvestmentSubmission { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.UserHramapping))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
