using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class TypeOfInvestmentCycle
    {
        public TypeOfInvestmentCycle()
        {
            InvestmentFileUserMapping = new HashSet<InvestmentFileUserMapping>();
            UserInvestmentCycleMapping = new HashSet<UserInvestmentCycleMapping>();
        }

        [Key]
        public long InvestmentCycleTypeId { get; set; }
        [Required]
        [StringLength(10)]
        public string Code { get; set; }
        [StringLength(50)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("InvestmentCycleType")]
        public virtual ICollection<InvestmentFileUserMapping> InvestmentFileUserMapping { get; set; }
        [InverseProperty("InvestmentCycletype")]
        public virtual ICollection<UserInvestmentCycleMapping> UserInvestmentCycleMapping { get; set; }
    }
}
