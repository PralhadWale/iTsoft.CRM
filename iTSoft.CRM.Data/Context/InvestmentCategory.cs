using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class InvestmentCategory
    {
        public InvestmentCategory()
        {
            InvestmentCategorySubcategoryMapping = new HashSet<InvestmentCategorySubcategoryMapping>();
        }

        [Key]
        [Column("InvestmentCategory")]
        public long InvestmentCategory1 { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(100)]
        public string Code { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("InvestmentCategory")]
        public virtual ICollection<InvestmentCategorySubcategoryMapping> InvestmentCategorySubcategoryMapping { get; set; }
    }
}
