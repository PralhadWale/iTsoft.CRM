using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class InvestmentCategorySubcategoryMapping
    {
        [Key]
        public long InvestmentCategorySubcategoryMappingId { get; set; }
        public long? InvestmentCategoryId { get; set; }
        public long? InvestmentSubCategoryId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(InvestmentCategoryId))]
        [InverseProperty("InvestmentCategorySubcategoryMapping")]
        public virtual InvestmentCategory InvestmentCategory { get; set; }
        [ForeignKey(nameof(InvestmentSubCategoryId))]
        [InverseProperty("InvestmentCategorySubcategoryMapping")]
        public virtual InvestmentSubCategory InvestmentSubCategory { get; set; }
    }
}
