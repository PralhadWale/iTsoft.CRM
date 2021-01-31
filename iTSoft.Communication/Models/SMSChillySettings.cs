using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iTSoft.Communication.Models
{
    public class SMSChillySettings
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string SenderName { get; set; }
        public long AddBy { get; set; }
        public DateTime? AddByTime { get; set; }
        public long EditBy { get; set; }
        public DateTime? EditByTime { get; set; }
        public string URL { get; set; }
    }
}