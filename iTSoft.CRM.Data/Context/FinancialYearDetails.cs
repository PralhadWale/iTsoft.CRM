using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class FinancialYearDetails
    {
        public FinancialYearDetails()
        {
            CompanyFinancialMapping = new HashSet<CompanyFinancialMapping>();
        }

        [Key]
        public long FinancialYearId { get; set; }
        [Required]
        [StringLength(10)]
        public string FinancialYear { get; set; }
        [Required]
        [StringLength(50)]
        public string DisplayYear { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("FinancialYear")]
        public virtual ICollection<CompanyFinancialMapping> CompanyFinancialMapping { get; set; }
    }
}
