using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.Communication.Models
{
    public class SMSTemplateMaster 
    {
        public long SMSTemplateId { get; set; }
        public string Body { get; set; }
        public long? TemplateTypeId { get; set; }
        public long? ContactId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class SMSTemplateMasterVM : SMSTemplateMaster
    {
        public string TemplateType { get; set; }
        public string Email { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public long MobileNo { get; set; }
        public string Name { get; set; }

    }
}
