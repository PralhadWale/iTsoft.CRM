using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class InvestmentFileUserMapping
    {
        [Key]
        public long InvestmentFileUserMappingId { get; set; }
        public long? UserFinancialId { get; set; }
        public long? FileId { get; set; }
        public long? InvestmentSubmissionId { get; set; }
        public long? InvestmentCycleTypeId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(FileId))]
        [InverseProperty(nameof(FileDetails.InvestmentFileUserMapping))]
        public virtual FileDetails File { get; set; }
        [ForeignKey(nameof(InvestmentCycleTypeId))]
        [InverseProperty(nameof(TypeOfInvestmentCycle.InvestmentFileUserMapping))]
        public virtual TypeOfInvestmentCycle InvestmentCycleType { get; set; }
        [ForeignKey(nameof(InvestmentSubmissionId))]
        [InverseProperty(nameof(InvestmentSubmissionDetails.InvestmentFileUserMapping))]
        public virtual InvestmentSubmissionDetails InvestmentSubmission { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.InvestmentFileUserMapping))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
