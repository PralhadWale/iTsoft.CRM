using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserFinancialInvestmentCycleMapping
    {
        public UserFinancialInvestmentCycleMapping()
        {
            AddressUserMapping = new HashSet<AddressUserMapping>();
            InvestmentFileUserMapping = new HashSet<InvestmentFileUserMapping>();
            UserFinancialDetailMapping = new HashSet<UserFinancialDetailMapping>();
            UserFinancialYearWiseDetails = new HashSet<UserFinancialYearWiseDetails>();
            UserHpmapping = new HashSet<UserHpmapping>();
            UserHramapping = new HashSet<UserHramapping>();
            UserLtamapping = new HashSet<UserLtamapping>();
            UserPreviousEmployeementMapping = new HashSet<UserPreviousEmployeementMapping>();
            UserRoleMapping = new HashSet<UserRoleMapping>();
        }

        [Key]
        public long UserFinancialId { get; set; }
        public long? UserId { get; set; }
        public long? CompanyFinancialId { get; set; }
        public long? UserInvestmentMappingId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(CompanyFinancialId))]
        [InverseProperty(nameof(CompanyFinancialMapping.UserFinancialInvestmentCycleMapping))]
        public virtual CompanyFinancialMapping CompanyFinancial { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(UserDetails.UserFinancialInvestmentCycleMapping))]
        public virtual UserDetails User { get; set; }
        [ForeignKey(nameof(UserInvestmentMappingId))]
        [InverseProperty(nameof(UserInvestmentCycleMapping.UserFinancialInvestmentCycleMapping))]
        public virtual UserInvestmentCycleMapping UserInvestmentMapping { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<AddressUserMapping> AddressUserMapping { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<InvestmentFileUserMapping> InvestmentFileUserMapping { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<UserFinancialDetailMapping> UserFinancialDetailMapping { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<UserFinancialYearWiseDetails> UserFinancialYearWiseDetails { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<UserHpmapping> UserHpmapping { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<UserHramapping> UserHramapping { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<UserLtamapping> UserLtamapping { get; set; }
        [InverseProperty("UserFinancial")]
        public virtual ICollection<UserPreviousEmployeementMapping> UserPreviousEmployeementMapping { get; set; }
        [InverseProperty("Userfinancial")]
        public virtual ICollection<UserRoleMapping> UserRoleMapping { get; set; }
    }
}
