using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class AddressUserMapping
    {
        [Key]
        public long AddressUserMappingId { get; set; }
        public long? AddressDetailsId { get; set; }
        public long? UserFinancialId { get; set; }
        public long? CityId { get; set; }
        public long? StateId { get; set; }
        public long? CountryId { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [ForeignKey(nameof(AddressDetailsId))]
        [InverseProperty("AddressUserMapping")]
        public virtual AddressDetails AddressDetails { get; set; }
        [ForeignKey(nameof(CityId))]
        [InverseProperty(nameof(CityDetail.AddressUserMapping))]
        public virtual CityDetail City { get; set; }
        [ForeignKey(nameof(CountryId))]
        [InverseProperty(nameof(CountryDetails.AddressUserMapping))]
        public virtual CountryDetails Country { get; set; }
        [ForeignKey(nameof(StateId))]
        [InverseProperty(nameof(StateDetails.AddressUserMapping))]
        public virtual StateDetails State { get; set; }
        [ForeignKey(nameof(UserFinancialId))]
        [InverseProperty(nameof(UserFinancialInvestmentCycleMapping.AddressUserMapping))]
        public virtual UserFinancialInvestmentCycleMapping UserFinancial { get; set; }
    }
}
