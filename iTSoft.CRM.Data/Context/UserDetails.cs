using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserDetails
    {
        public UserDetails()
        {
            UserFinancialInvestmentCycleMapping = new HashSet<UserFinancialInvestmentCycleMapping>();
            UserLoginMapping = new HashSet<UserLoginMapping>();
        }

        [Key]
        public long UserId { get; set; }
        [Column("FName")]
        [StringLength(50)]
        public string Fname { get; set; }
        [Column("MName")]
        [StringLength(50)]
        public string Mname { get; set; }
        [Column("LName")]
        [StringLength(50)]
        public string Lname { get; set; }
        [StringLength(100)]
        public string EmailId { get; set; }
        [StringLength(20)]
        public string MobileNo { get; set; }
        [StringLength(10)]
        public string UserPan { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? DateOfBirth { get; set; }
        [StringLength(5)]
        public string Gender { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("User")]
        public virtual ICollection<UserFinancialInvestmentCycleMapping> UserFinancialInvestmentCycleMapping { get; set; }
        [InverseProperty("User")]
        public virtual ICollection<UserLoginMapping> UserLoginMapping { get; set; }
    }
}
