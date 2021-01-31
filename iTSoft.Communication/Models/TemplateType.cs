using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.Communication.Models
{
    public enum TemplateType
    {
        ChangePassword = 1,
        ForgotPassword = 2,
        EFillingRequestCreation = 3,
        RequestUpdated = 4,
        Registration = 5,
        PaymentSuccessfull = 6,
        PaymentFailed = 7,
        SendOTP=8,
        PaymentCancelled=9
    }
}
