using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserRoleMapping
    {
        public UserRoleMapping()
        {
            UserAccessMapping = new HashSet<UserAccessMapping>();
        }

        [Key]
        public long UserRoleMappingId { get; set; }
        public long? Userfinancialid { get; set; }
        public long? RoleId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(RoleId))]
        [InverseProperty(nameof(RolesDetails.UserRoleMapping))]
        public virtual RolesDetails Role { get; set; }
        [ForeignKey(nameof(Userfinancialid))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.UserRoleMapping))]
        public virtual UserFinancialInvestmentCycleMapping Userfinancial { get; set; }
        [InverseProperty("UserRoleMapping")]
        public virtual ICollection<UserAccessMapping> UserAccessMapping { get; set; }
    }
}
