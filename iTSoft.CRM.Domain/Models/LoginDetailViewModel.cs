using System;

namespace iTSoft.CRM.Domain.Models
{
    public class LoginDetailViewModel
    {
        public long LoginId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public long? LoginAttempt { get; set; }
        public long? Otp { get; set; }
        public DateTime? OtpCreatedDate { get; set; }
        public bool? IsActive { get; set; }
      
    }
}
