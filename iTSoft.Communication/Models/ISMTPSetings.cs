﻿using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.Communication.Models
{
   public   interface ISMTPSetings
    {
        string SmtpClientHostName { get; set; }
        string SmtpClientHostServerAddress { get; set; }
        int SmtpClientPort { get; set; }
    }
}
