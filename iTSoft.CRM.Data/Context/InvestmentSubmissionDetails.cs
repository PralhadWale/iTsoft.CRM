using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class InvestmentSubmissionDetails
    {
        public InvestmentSubmissionDetails()
        {
            InvestmentFileUserMapping = new HashSet<InvestmentFileUserMapping>();
            UserHpmapping = new HashSet<UserHpmapping>();
            UserHramapping = new HashSet<UserHramapping>();
            UserLtamapping = new HashSet<UserLtamapping>();
            UserPreviousEmployeementMapping = new HashSet<UserPreviousEmployeementMapping>();
        }

        [Key]
        public long InvestmentSubmissionId { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? EnteredAmount { get; set; }
        [StringLength(500)]
        public string UserComment { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? AcceptedAmount { get; set; }
        [StringLength(10)]
        public string IsAccepted { get; set; }
        [StringLength(500)]
        public string Reason { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("InvestmentSubmission")]
        public virtual ICollection<InvestmentFileUserMapping> InvestmentFileUserMapping { get; set; }
        [InverseProperty("InvestmentSubmission")]
        public virtual ICollection<UserHpmapping> UserHpmapping { get; set; }
        [InverseProperty("InvestmentSubmission")]
        public virtual ICollection<UserHramapping> UserHramapping { get; set; }
        [InverseProperty("InvestmentSubmission")]
        public virtual ICollection<UserLtamapping> UserLtamapping { get; set; }
        [InverseProperty("InvestmentSubmission")]
        public virtual ICollection<UserPreviousEmployeementMapping> UserPreviousEmployeementMapping { get; set; }
    }
}
