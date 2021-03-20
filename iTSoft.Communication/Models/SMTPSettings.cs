using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.Communication.Models
{
    public class SMTPSettings : ISMTPSetings
    {
        public long SMTPSettingId { get; set; }
        public string SmtpClientHostName { get; set; }
        public string SmtpClientHostServerAddress { get; set; }
        public int SmtpClientPort { get; set; }
    }
}
