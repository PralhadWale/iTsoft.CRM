using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class InvestmentCycleDetails
    {
        public InvestmentCycleDetails()
        {
            UserInvestmentCycleMapping = new HashSet<UserInvestmentCycleMapping>();
        }

        [Key]
        public long InvestmentCycleId { get; set; }
        [Required]
        [StringLength(10)]
        public string Code { get; set; }
        [StringLength(10)]
        public string DisplayName { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime StartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime EndDate { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("InvestmentCycle")]
        public virtual ICollection<UserInvestmentCycleMapping> UserInvestmentCycleMapping { get; set; }
    }
}
