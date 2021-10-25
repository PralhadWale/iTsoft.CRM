using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.Communication.Models
{
    public class EmailTemplateMaster 
    {
        public long EmailTemplateId { get; set; }
        public long EmailId { get; set; }
        public string Body { get; set; }
        public long? TemplateTypeId { get; set; }
        public string Subject { get; set; }
        public bool? IsActive { get; set; }
        public int SMTPSettingId { get; set; }

    }

    public class EmailTemplateMasterVM : EmailTemplateMaster
    {
        public string TemplateType { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public SMTPSettings SMTPSettings {get;set;}
    }
}
