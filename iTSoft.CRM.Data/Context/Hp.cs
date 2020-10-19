using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    [Table("HP")]
    public partial class Hp
    {
        public Hp()
        {
            UserHpmapping = new HashSet<UserHpmapping>();
        }

        [Key]
        public long HpId { get; set; }
        [StringLength(100)]
        public string LenderName { get; set; }
        [StringLength(500)]
        public string LenderAddress { get; set; }
        [Column("LenderPAN")]
        [StringLength(10)]
        public string LenderPan { get; set; }
        public bool? IsLetOut { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? IntrestPaidOnProperty { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? MuncipalTaxes { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("Hp")]
        public virtual ICollection<UserHpmapping> UserHpmapping { get; set; }
    }
}
