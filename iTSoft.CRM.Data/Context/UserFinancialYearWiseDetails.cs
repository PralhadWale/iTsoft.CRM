using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserFinancialYearWiseDetails
    {
        [Key]
        public long UserFinancialYearWiseDetailsId { get; set; }
        public long? UserFinancialId { get; set; }
        public long? DepartmentId { get; set; }
        [StringLength(100)]
        public string Address { get; set; }
        [StringLength(100)]
        public string Designation { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DateOfJoin { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(DepartmentId))]
        [InverseProperty(nameof(DepartmentDetails.UserFinancialYearWiseDetails))]
        public virtual DepartmentDetails Department { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.UserFinancialYearWiseDetails))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
