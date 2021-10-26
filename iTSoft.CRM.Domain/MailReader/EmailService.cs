using EAGetMail;
using iTSoft.Communication.Models;
using iTSoft.Communication.Service.Helpers;
using iTSoft.CRM.Core.Cryptography;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Data.Enum;
using iTSoft.CRM.Domain.Models.ViewModel;
using iTSoft.CRM.Domain.Services;
using iTSoft.CRM.Domain.Services.Master;
using iTSoft.CRM.Domain.Services.Process;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace iTSoft.CRM.Domain.MailReader
{
    public class EmailService
    {
        public void ReadMails()
        {

            GenericService<EmailMaster> emailService = new GenericService<EmailMaster>();
            EmployeeMasterService employeeMasterService = new EmployeeMasterService();
            var employeeDetails = employeeMasterService.GetEmployeeInfo(new EmployeeMaster());

            EncryptionHelper encryptionHelper = new EncryptionHelper();
           // if (emails != null && emails.Count > 0)
            {
                //foreach (EmailMaster emailMaster in emails)
                {
                   
                    MailServer oServer = new MailServer("imap.gmail.com", "quarxtechcrm003@gmail.com", "Quarxtech@2021", ServerProtocol.Imap4);
                    //MailServer oServer = new MailServer("imap.gmail.com", "ajaybhatnagar9923@gmail.com", "9923752421", ServerProtocol.Imap4);
                    //MailServer oServer = new MailServer("imap.gmail.com", "surajsinghmmf@gmail.com", "Mmf@1234", ServerProtocol.Imap4);
                    MailClient oClient = new MailClient("TryIt");
                    oServer.SSLConnection = true;
                    oServer.Port = 993;
                    oClient.GetMailInfosParam.GetMailInfosOptions = GetMailInfosOptionType.NewOnly;
                    oClient.Connect(oServer);
                    MailInfo[] infos = oClient.GetMailInfos();
                    foreach(MailInfo info in infos)
                    {
                        Mail oMail = oClient.GetMail(info);
                        var count = oMail.Attachments.ToList().Count;
                        for (int j = 0; j < count; j++)
                        {
                            // oMail.Attachments[j].SaveAs(Application + "\\" + oMail.Attachments[j].Name, true); // true for overWrite file
                        }

                        string emlPath = Path.Combine(ApplicationSettings.UploadPath, DateTime.Now.Ticks.ToString() + ".eml");
                        oMail.SaveAs(emlPath,true);
                        ConvertMailToHtml(emlPath);

                        EmployeeMaster emp = null;
                        foreach (EmployeeMaster employeeMaster in employeeDetails)
                        {
                            if (oMail.TextBody.Contains(employeeMaster.Email))
                            {
                                emp = employeeMaster;
                            }
                        }

                        if (emp == null)
                        {
                            emp = employeeDetails.FirstOrDefault();
                        }
                        if (CreateRequest(emlPath, oMail , emp))
                        {
                            if (!info.Read)
                            {
                                 oClient.MarkAsRead(info, true);
                               
                            }
                        }
                    }
                }
            }
        }

        private void SendNotification(string requestNo , EmployeeMaster employeeDetails)
        {
            EmailDataVM emailConfig = new EmailDataVM();
            emailConfig.From = "quarxtechcrm003@gmail.com";
            emailConfig.FromEmailPassword = "Quarxtech@2021";
            emailConfig.SMTPSettings = new SMTPSettings() { SmtpClientHostName = "smtp.gmail.com" , SmtpClientHostServerAddress = "smtp.gmail.com" , SmtpClientPort = 587 };

            //employeeDetails.EmailId = "pralhadwale@gmail.com";

            EmailHelper emailHelper = new EmailHelper();
            emailConfig.To = employeeDetails.EmailId;
            emailConfig.Subject = "Request Numbered " + requestNo + " has been assigned to you";

            emailConfig.MailBody =  "Dear " + employeeDetails.FirstName + "<br/><br/>" + "Request Numbered " + requestNo + " has been assigned to you" +
                 "You can view request by clicking on <a href=\"#\">this</a> link.";
            emailConfig.IsHTML = true;
            emailHelper.SendEmail(emailConfig);
        }

        private bool CreateRequest(string emlFile, Mail oMail,  EmployeeMaster employeeDetails)
        {
            bool result = false;
            try
            {
                IRequestService requestService = new RequestService();

                int pos = emlFile.LastIndexOf(".");
                string attachmentFolder = emlFile.Substring(0, pos);
                string htmlFile = attachmentFolder + ".htm";
                RequestViewModel requestViewModel = new RequestViewModel();
                RequestMaster requestMaster = new RequestMaster();
                //requestMaster.RequestNo = 

                requestMaster.Subject = oMail.Subject;
                requestMaster.Message = oMail.TextBody;
                requestMaster.RequestDate = oMail.ReceivedDate;
                requestMaster.RequestTypeId = (int)RequestType.Enquiry;
                if (employeeDetails != null)
                {
                    requestMaster.AdvisorId = employeeDetails.EmployeeId;
                    requestMaster.AddedBy = employeeDetails.EmployeeId;
                    requestMaster.UpdatedBy = employeeDetails.EmployeeId;
                    requestMaster.AssignedOn = DateTime.Now;
                }
                requestMaster.AddedOn = DateTime.Now;
                requestMaster.UpdatedOn = DateTime.Now;
                requestMaster.EmailHtmlPath = htmlFile;
                requestMaster.ClientBehaviourId = 1;
                requestMaster.ClientTypeId = 2;
                requestMaster.BAEmailId = -1;
                requestViewModel.RequestMaster = requestMaster;


                requestViewModel.ContactPersonMasters = new List<ContactPersonMaster>();
                requestViewModel.ContactPersonMasters.Add(new ContactPersonMaster()
                {
                    Country = "India",
                    Designation = "Purchase Offisor",
                    FirstName = oMail.From.Name,
                    MiddleName = "",
                    LastName = "",
                    AddedOn = DateTime.Now,
                    Email = oMail.From.Address,
                   
                }) ;
                
                


                requestViewModel.RequestServiceMasters = new List<RequestServiceMaster>();
                requestViewModel.RequestServiceMasters.Add(new RequestServiceMaster()
                {
                    ServiceId = 6,
                    DepartmentId = 1,
                    NoOfEmployees = 10,
                    Quantity = 1,
                    ServiceQuotedPrice = 1000,
                    ServiceDiscountType = 1,
                    ServiceQuotedDiscountPercent = 0,
                    ServiceQuotedDicountAmount = 0,
                    ServiceQuotedNetAmount = 1000,
                    ServiceAgreedDiscountAmount = 0,
                    ServiceAgreedDiscountPercent = 0,
                    ServiceAgreedNetAmount = 1000,
                    AdvisorId = employeeDetails?.EmployeeId,
                    AssignedOn = DateTime.Now,
                    Attempts = 0,
                    FinancialYearId = 5,
                    LeadStatusId = 10008,
                    StageId = 1,
                    SourceId = 2


                });
                ;


                var saveResult = requestService.SaveRequest(requestViewModel);

                result = saveResult != null;
                if (saveResult != null)
                {
                    SendNotification(saveResult.RequestNo,employeeDetails);
                }
            }
            catch(Exception ex)
            {

            }
            return result;
        }

        static string _formatHtmlTag(string src)
        {
            src = src.Replace(">", "&gt;");
            src = src.Replace("<", "&lt;");
            return src;
        }

        static string _formatAddresses(MailAddress[] addresses, string prefix)
        {
            if (addresses.Length == 0)
            {
                return "";
            }

            StringBuilder buffer = new StringBuilder();
            buffer.Append(string.Format("<b>{0}:</b> ", prefix));

            for (int i = 0; i < addresses.Length; i++)
            {
                buffer.Append(_formatHtmlTag(addresses[i].ToString()));
                if (i < addresses.Length - 1)
                {
                    buffer.Append("; ");
                }
            }

            buffer.Append("<br>");
            return buffer.ToString();
        }

        // We generate a html + attachment folder for every email, once the html is create,
        // next time we don't need to parse the email again.
        static void _generateHtmlForEmail(string emlFile, string htmlFile,
                            string attachmentFolder)
        {
            // For evaluation usage, please use "TryIt" as the license code, otherwise the
            //"invalid license code" exception will be thrown. However, the object will expire in 1-2 months, then
            //"trial version expired" exception will be thrown.
            Mail mail = new Mail("TryIt");
            mail.Load(emlFile, false);

            if (mail.IsEncrypted)
            {
                try
                {
                    // this email is encrypted, we decrypt it by user default certificate.
                    // you can also use specified certificate like this
                    // oCert = new Certificate();
                    // oCert.Load("c:\\test.pfx", "pfxpassword", Certificate.CertificateKeyLocation.CRYPT_USER_KEYSET)
                    // oMail = oMail.Decrypt( oCert );
                    mail = mail.Decrypt(null);
                }
                catch (Exception ep)
                {
                    Console.WriteLine(ep.Message);
                }
            }

            if (mail.IsSigned)
            {
                try
                {
                    // This email is digital signed.
                    Certificate signerCertificate = mail.VerifySignature();
                    Console.WriteLine("This email contains a valid digital signature.");

                    // You can add the certificate to your certificate storage like this
                    // cert.AddToStore( Certificate.CertificateStoreLocation.CERT_SYSTEM_STORE_CURRENT_USER,
                    //      "addressbook" );
                    // then you can use send the encrypted email back to this sender.
                }
                catch (Exception ep)
                {
                    Console.WriteLine(ep.Message);
                }
            }

            // Decode winmail.dat (Outlook TNEF stream) automatically.
            // also convert RTF body to HTML body automatically.MO
            mail.DecodeTNEF();

            string html = mail.HtmlBody;
            StringBuilder header = new StringBuilder();

            header.Append("<font face=\"Courier New,Arial\" size=2>");
            header.Append("<b>From:</b> " + _formatHtmlTag(mail.From.ToString()) + "<br>");

            header.Append(_formatAddresses(mail.To, "To"));
            header.Append(_formatAddresses(mail.Cc, "Cc"));

            header.Append(string.Format("<b>Subject:</b>{0}<br>\r\n", _formatHtmlTag(mail.Subject)));

            Attachment[] attachments = mail.Attachments;
            if (attachments.Length > 0)
            {
                if (!Directory.Exists(attachmentFolder))
                    Directory.CreateDirectory(attachmentFolder);

                header.Append("<b>Attachments:</b> ");
                for (int i = 0; i < attachments.Length; i++)
                {
                    Attachment attachment = attachments[i];

                    string attachmentName = string.Format("{0}\\{1}", attachmentFolder, attachment.Name);
                    attachment.SaveAs(attachmentName, true);

                    header.Append(string.Format("<a href=\"{0}\" target=\"_blank\">{1}</a> ",
                        attachmentName, attachment.Name));
                    if (attachment.ContentID.Length > 0)
                    {   // Show embedded image.
                        html = html.Replace("cid:" + attachment.ContentID, attachmentName);
                    }
                }
            }

            // Change original meta header encoding to utf-8
            Regex reg = new Regex("(<meta[^>]*charset[ \t]*=[ \t\"]*)([^<> \r\n\"]*)", RegexOptions.Multiline | RegexOptions.IgnoreCase);
            html = reg.Replace(html, "$1utf-8");
            if (!reg.IsMatch(html))
            {
                header.Insert(0, "<meta HTTP-EQUIV=\"Content-Type\" Content=\"text/html; charset=utf-8\">");
            }

            html = header.ToString() + "<hr>" + html;

            using (FileStream stream = new FileStream(htmlFile, FileMode.Create, FileAccess.Write, FileShare.None))
            {
                byte[] buffer = Encoding.UTF8.GetBytes(html);
                stream.Write(buffer, 0, buffer.Length);
                stream.Close();
            }
        }

        static void ConvertMailToHtml(string emlFile)
        {
            try
            {
                int pos = emlFile.LastIndexOf(".");
                string attachmentFolder = emlFile.Substring(0, pos);
                string htmlFile = attachmentFolder + ".htm";

                if (!File.Exists(htmlFile))
                {
                    // We haven't generate the html for this email, generate it now.
                    _generateHtmlForEmail(emlFile, htmlFile, attachmentFolder);
                }

                Console.WriteLine("Please open {0} to browse your email",
                    htmlFile);
            }
            catch (Exception ep)
            {
                Console.WriteLine(ep.Message);
            }
        }
    }
}
