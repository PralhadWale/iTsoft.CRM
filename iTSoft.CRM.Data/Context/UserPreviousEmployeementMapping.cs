using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserPreviousEmployeementMapping
    {
        [Key]
        public long UserPreviousEmployeementId { get; set; }
        public long? InvestmentSubmissionId { get; set; }
        public long? UserFinancialId { get; set; }
        public long? PreviousEmployeementId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(InvestmentSubmissionId))]
        [InverseProperty(nameof(InvestmentSubmissionDetails.UserPreviousEmployeementMapping))]
        public virtual InvestmentSubmissionDetails InvestmentSubmission { get; set; }
        [ForeignKey(nameof(PreviousEmployeementId))]
        [InverseProperty(nameof(PreviousEmployeementDetails.UserPreviousEmployeementMapping))]
        public virtual PreviousEmployeementDetails PreviousEmployeement { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.UserPreviousEmployeementMapping))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
