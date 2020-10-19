using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    [Table("HRA")]
    public partial class Hra
    {
        public Hra()
        {
            UserHramapping = new HashSet<UserHramapping>();
        }

        [Key]
        public long HraId { get; set; }
        [StringLength(100)]
        public string LandlordName { get; set; }
        [StringLength(500)]
        public string LandlordAddress { get; set; }
        [StringLength(100)]
        public string City { get; set; }
        [StringLength(100)]
        public string IsMetro { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? EnteredRent { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? AcceptedRent { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? StartDate { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? EndDate { get; set; }
        [Column("LandlordPAN")]
        [StringLength(10)]
        public string LandlordPan { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("Hra")]
        public virtual ICollection<UserHramapping> UserHramapping { get; set; }
    }
}
