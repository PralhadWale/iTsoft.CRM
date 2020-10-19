using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class PreviousEmployeementDetails
    {
        public PreviousEmployeementDetails()
        {
            UserPreviousEmployeementMapping = new HashSet<UserPreviousEmployeementMapping>();
        }

        [Key]
        public long PreviousEmployeementId { get; set; }
        [StringLength(100)]
        public string EmployerName { get; set; }
        [StringLength(500)]
        public string Address { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EmployeementStartDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? EmployeementEndDate { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TotalSalary { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? PaidTaxAmount { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("PreviousEmployeement")]
        public virtual ICollection<UserPreviousEmployeementMapping> UserPreviousEmployeementMapping { get; set; }
    }
}
