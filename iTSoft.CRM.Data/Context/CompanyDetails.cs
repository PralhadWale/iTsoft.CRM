using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class CompanyDetails
    {
        public CompanyDetails()
        {
            CompanyFinancialMapping = new HashSet<CompanyFinancialMapping>();
            DepartmentDetails = new HashSet<DepartmentDetails>();
        }

        [Key]
        public long CompanyId { get; set; }
        [Required]
        [StringLength(100)]
        public string CompanyUrl { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(100)]
        public string Address { get; set; }
        [StringLength(10)]
        public string CompanyPan { get; set; }
        [Required]
        [StringLength(10)]
        public string CompanyTan { get; set; }
        [Required]
        [StringLength(100)]
        public string Officialwebsite { get; set; }
        [Required]
        [StringLength(100)]
        public string LogoUrl { get; set; }
        [Required]
        [StringLength(50)]
        public string LogoMimeType { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("Company")]
        public virtual ICollection<CompanyFinancialMapping> CompanyFinancialMapping { get; set; }
        [InverseProperty("Company")]
        public virtual ICollection<DepartmentDetails> DepartmentDetails { get; set; }
    }
}
