using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class UserLoginMapping
    {
        [Key]
        public long Userloginmappingid { get; set; }
        public long? UserId { get; set; }
        public long? LoginId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(LoginId))]
        [InverseProperty(nameof(LoginDetail.UserLoginMapping))]
        public virtual LoginDetail Login { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(UserDetails.UserLoginMapping))]
        public virtual UserDetails User { get; set; }
    }
}
