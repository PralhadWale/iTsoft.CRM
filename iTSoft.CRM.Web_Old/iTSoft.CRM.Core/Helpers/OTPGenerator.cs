using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Core.Helpers
{
    public class OTPGenerator
    {
        public string GenerateOTP()
        {
            string numbers = "1234567890";
            string characters = numbers;
            int length = 6;
            string otp = string.Empty;
            for (int i = 0; i < length; i++)
            {
                string character = string.Empty;
                do
                {
                    int index = new Random().Next(0, characters.Length);
                    character = characters.ToCharArray()[index].ToString();
                } while (otp.IndexOf(character) != -1);
                otp += character;
            }
            return otp;
        }
    }
}
