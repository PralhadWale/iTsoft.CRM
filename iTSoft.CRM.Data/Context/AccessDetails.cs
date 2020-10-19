using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class AccessDetails
    {
        public AccessDetails()
        {
            UserAccessMapping = new HashSet<UserAccessMapping>();
        }

        [Key]
        public long AccessId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("Access")]
        public virtual ICollection<UserAccessMapping> UserAccessMapping { get; set; }
    }
}
