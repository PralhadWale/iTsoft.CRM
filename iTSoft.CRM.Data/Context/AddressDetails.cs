using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class AddressDetails
    {
        public AddressDetails()
        {
            AddressUserMapping = new HashSet<AddressUserMapping>();
        }

        [Key]
        public long AddressDetailsId { get; set; }
        [StringLength(100)]
        public string Address { get; set; }
        [StringLength(10)]
        public string Pincode { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("AddressDetails")]
        public virtual ICollection<AddressUserMapping> AddressUserMapping { get; set; }
    }
}
