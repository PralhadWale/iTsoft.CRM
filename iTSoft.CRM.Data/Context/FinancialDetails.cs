using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class FinancialDetails
    {
        public FinancialDetails()
        {
            UserFinancialDetailMapping = new HashSet<UserFinancialDetailMapping>();
        }

        [Key]
        public long FinancialDetailsId { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Salary { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? BasicSalary { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Da { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? OtherPerquisites { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Hra { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Lta { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? DailyAllowance { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TravelAllowance { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? ConveyanceAllowance { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TotalEarning { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? ProfessionalTax { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? MedicalInsurance { get; set; }
        [Column("EmployeePF", TypeName = "decimal(18, 2)")]
        public decimal? EmployeePf { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Gratuity { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("FinancialDetails")]
        public virtual ICollection<UserFinancialDetailMapping> UserFinancialDetailMapping { get; set; }
    }
}
