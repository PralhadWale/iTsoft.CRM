using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class ServiceResponse
    {
        public ResponseCode ResponseCode { get; set; }
        public string Message { get; set; }
        public dynamic ResponseData { get; set; }

    }
}
