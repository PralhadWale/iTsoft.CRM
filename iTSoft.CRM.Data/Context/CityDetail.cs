using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class CityDetail
    {
        public CityDetail()
        {
            AddressUserMapping = new HashSet<AddressUserMapping>();
        }

        [Key]
        public long CityId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public long? StateId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(StateId))]
        [InverseProperty(nameof(StateDetails.CityDetail))]
        public virtual StateDetails State { get; set; }
        [InverseProperty("City")]
        public virtual ICollection<AddressUserMapping> AddressUserMapping { get; set; }
    }
}
