using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class LoginDetail
    {
        public LoginDetail()
        {
            UserLoginMapping = new HashSet<UserLoginMapping>();
        }

        [Key]
        public long LoginId { get; set; }
        [StringLength(100)]
        public string UserName { get; set; }
        [StringLength(100)]
        public string Password { get; set; }
        public long? LoginAttempt { get; set; }
        public long? Otp { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? OtpCreatedDate { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("Login")]
        public virtual ICollection<UserLoginMapping> UserLoginMapping { get; set; }
    }
}
