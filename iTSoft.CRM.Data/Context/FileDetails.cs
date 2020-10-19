using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iTSoft.CRM.Data.Context
{
    public partial class FileDetails
    {
        public FileDetails()
        {
            InvestmentFileUserMapping = new HashSet<InvestmentFileUserMapping>();
        }

        [Key]
        public long FileId { get; set; }
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(50)]
        public string MimeType { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreatedDate { get; set; }
        public long? UpdatedBy { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? UpdatedDate { get; set; }

        [InverseProperty("File")]
        public virtual ICollection<InvestmentFileUserMapping> InvestmentFileUserMapping { get; set; }
    }
}
