using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    [Table("LTA")]
    public partial class Lta
    {
        public Lta()
        {
            UserLtamapping = new HashSet<UserLtamapping>();
        }

        [Key]
        public long LtaId { get; set; }
        [StringLength(200)]
        public string JourneyStartPlace { get; set; }
        [StringLength(200)]
        public string JourneyEndPlace { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? JourneyStartDate { get; set; }
        [Column("JourneYEndDate", TypeName = "datetime")]
        public DateTime? JourneYendDate { get; set; }
        [StringLength(100)]
        public string JourneyMode { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("Lta")]
        public virtual ICollection<UserLtamapping> UserLtamapping { get; set; }
    }
}
