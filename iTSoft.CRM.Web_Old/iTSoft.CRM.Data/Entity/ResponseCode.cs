using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public enum ResponseCode
    {
        Success = 1,
        Failed = 10000,
        ApplicationError = 10001,
        DataBaseError = 10002,
        InvalidUserNameOrPassword = 10003,
        NotFound = 10004,
        AlreadyExists = 10005,
        InUse = 10006,
        NotAllowed = 10007,
    }
}
