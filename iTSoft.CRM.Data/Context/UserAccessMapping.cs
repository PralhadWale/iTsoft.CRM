using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserAccessMapping
    {
        [Key]
        public long AccessMatrixId { get; set; }
        public long? AccessId { get; set; }
        public long? UserRoleMappingId { get; set; }
        public bool? IsAllow { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(AccessId))]
        [InverseProperty(nameof(AccessDetails.UserAccessMapping))]
        public virtual AccessDetails Access { get; set; }
        [ForeignKey(nameof(UserRoleMappingId))]
        [InverseProperty("UserAccessMapping")]
        public virtual UserRoleMapping UserRoleMapping { get; set; }
    }
}
