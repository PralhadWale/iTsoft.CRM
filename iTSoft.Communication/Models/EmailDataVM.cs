using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.Communication.Models
{
    public class EmailDataVM
    {
        public long MailHeaderId { get; set; }
        public string EmailTrackerUniqueId { get; set; }
        public string ProcessedBy { get; set; }
        public string Remark { get; set; }
        public string InvoiceNo { get; set; }
        public string Subject { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string CC { get; set; }
        public string BCC { get; set; }
        public string MailBody { get; set; }
        public bool IsHTML { get; set; }
        public string[] Attachments { get; set; }
        public string FromEmailPassword { get; set; }
        public string SmtpClientHostName { get; set; }
        public string SmtpClientHostServerAddress { get; set; }
        public int SmtpClientPort { get; set; }
        public bool IsBase64Attachment { get; set; }
        public List<Attachments> AttachmentList { get; set; }
    }

    public class Attachments
    {
        public string Content { get; set; }
        public string FileName { get; set; }
    }
}
