using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class StateDetails
    {
        public StateDetails()
        {
            AddressUserMapping = new HashSet<AddressUserMapping>();
            CityDetail = new HashSet<CityDetail>();
        }

        [Key]
        public long StateId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public long? CountryId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(CountryId))]
        [InverseProperty(nameof(CountryDetails.StateDetails))]
        public virtual CountryDetails Country { get; set; }
        [InverseProperty("State")]
        public virtual ICollection<AddressUserMapping> AddressUserMapping { get; set; }
        [InverseProperty("State")]
        public virtual ICollection<CityDetail> CityDetail { get; set; }
    }
}
