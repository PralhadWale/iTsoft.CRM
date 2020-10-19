using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class DepartmentDetails
    {
        public DepartmentDetails()
        {
            UserFinancialYearWiseDetails = new HashSet<UserFinancialYearWiseDetails>();
        }

        [Key]
        public long DepartmentId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(20)]
        public string Code { get; set; }
        public long? CompanyId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(CompanyId))]
        [InverseProperty(nameof(CompanyDetails.DepartmentDetails))]
        public virtual CompanyDetails Company { get; set; }
        [InverseProperty("Department")]
        public virtual ICollection<UserFinancialYearWiseDetails> UserFinancialYearWiseDetails { get; set; }
    }
}
