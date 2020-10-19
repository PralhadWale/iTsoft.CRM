using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class CountryDetails
    {
        public CountryDetails()
        {
            AddressUserMapping = new HashSet<AddressUserMapping>();
            StateDetails = new HashSet<StateDetails>();
        }

        [Key]
        public long CountryId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("Country")]
        public virtual ICollection<AddressUserMapping> AddressUserMapping { get; set; }
        [InverseProperty("Country")]
        public virtual ICollection<StateDetails> StateDetails { get; set; }
    }
}
