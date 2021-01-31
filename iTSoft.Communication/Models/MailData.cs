using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.Communication.Models
{
    public class MailData
    {
        public String FromEmail { get; set; }
        public String FromEmailPassword { get; set; }
        public String SmtpClientHostName { get; set; }
        public String SmtpClientHostServerAddress { get; set; }

        public String SentMail { get; set; }

        public String MailSubject { get; set; }

        public String MailAttachmentPath { get; set; }
        public String MailSignature { get; set; }

        public String MailBodyMessage { get; set; }
        public int SmtpClientPort { get; set; }
    }
}
