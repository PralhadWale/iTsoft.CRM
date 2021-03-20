using iTSoft.Communication.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.Communication.Service.Helpers
{
    public class EmailHelper
    {


        public  EmailHelper()
        {
        }
        public bool SendEmail(EmailDataVM emailConfig)
        {
            bool MailStatus = false;
            try
            { 
                if (emailConfig.From != "")
                {
                    MailMessage newmsg = new MailMessage(emailConfig.From, emailConfig.To);
                    newmsg.Subject = emailConfig.Subject;
                    newmsg.Body = emailConfig.MailBody;
                    newmsg.IsBodyHtml = emailConfig.IsHTML;
                    if (emailConfig.Attachments != null && emailConfig.Attachments.Length > 0)
                    {
                        foreach (string attachment in emailConfig.Attachments)
                        {

                            Attachment att = new Attachment(attachment);
                            newmsg.Attachments.Add(att);
                        }


                    }
                    if (emailConfig.AttachmentList != null)
                    {
                        foreach (Attachments attachments in emailConfig.AttachmentList)
                        {
                            int startIndex = attachments.Content.IndexOf("base64,");
                            if (startIndex > 0)
                            {
                                attachments.Content = attachments.Content.Substring(startIndex + 7, attachments.Content.Length - (startIndex + 7));
                            }
                            byte[] bytes = Convert.FromBase64String(attachments.Content);
                            MemoryStream ms = new MemoryStream(bytes, 0, bytes.Length);
                            Attachment att = new Attachment(ms, attachments.FileName);
                            newmsg.Attachments.Add(att);
                        }
                    }

                    SmtpClient smtp = new SmtpClient(emailConfig.SMTPSettings.SmtpClientHostName, emailConfig.SMTPSettings.SmtpClientPort);
                    smtp.Host = emailConfig.SMTPSettings.SmtpClientHostServerAddress; //Or Your SMTP Server Address  
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(emailConfig.From, emailConfig.FromEmailPassword);
                    smtp.EnableSsl = true;
                    smtp.Timeout = 500000000;
                    System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s, System.Security.Cryptography.X509Certificates.X509Certificate certificate, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
                    {
                        return true;
                    };

                    smtp.Send(newmsg);
                    MailStatus = true;
                }
            }
            catch (Exception ex)
            {
                // ErrorLogger.WriteError("eCampusMailSent", "MailSent", new List<object>() { emailConfig }, ex);
                MailStatus = false;
                //MessageBoxHelper.ShowErrorMessage(ex, "Failed to send mail for " + emailConfig.To);
            }

            return MailStatus;
        }


    }
}
