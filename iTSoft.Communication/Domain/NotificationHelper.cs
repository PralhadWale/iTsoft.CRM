using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using System.IO;
using iTSoft.Communication.Models;

namespace iTSoft.Communication.Service.Helpers
{
    public class NotificationHelper
    {

        public string MailSignature = string.Empty;

        public List<EmailTemplateMasterVM> EmailTemplates { get; set; }

        public List<SMSTemplateMasterVM> SMSTemplates { get; set; }
        public NotificationHelper()
        {

        }

        public NotificationHelper(List<EmailTemplateMasterVM> _emailTemplates, List<SMSTemplateMasterVM> _smsTemplates)
        {
            EmailTemplates = _emailTemplates;
            SMSTemplates = _smsTemplates;
        }


        public bool SendNotification<T>(T Parameter, TemplateType tempalteType, string email, string mobile, bool mailonly, List<string> attachmentFilePath = null)
        {
            try
            {
                EmailTemplateMasterVM emailTemplateMaster = EmailTemplates.Where(t => t.TemplateTypeId == (int)tempalteType).FirstOrDefault();
                this.SendMail<T>(emailTemplateMaster, email, Parameter, attachmentFilePath);
                if (!mailonly)
                {
                    SMSTemplateMasterVM smsTemplateMaster = SMSTemplates.Where(t => t.TemplateTypeId == (int)tempalteType).FirstOrDefault();
                    this.SendSMS<T>(smsTemplateMaster, mobile, Parameter);
                }
                return true;
            }
            catch (Exception e)
            {
            }
            return false;
        }

        public bool SendMail<T>(EmailTemplateMasterVM template, string To, T Parameter, List<string> attachmentFilePath = null)
        {
            try
            {
                EmailDataVM emailConfig = new EmailDataVM();
                emailConfig.From = template.Email;
                emailConfig.FromEmailPassword = template.Password;
                emailConfig.SMTPSettings = template.SMTPSettings;

                if (attachmentFilePath != null)
                    emailConfig.Attachments = attachmentFilePath.ToArray();
                EmailHelper emailHelper = new EmailHelper();
                emailConfig.To = To;
                emailConfig.Subject = template.Subject;

                emailConfig.MailBody = FormatMailBody<T>(template.Body, Parameter);
                emailConfig.IsHTML = true;
                return emailHelper.SendEmail(emailConfig);
            }
            catch (Exception e)
            { }
            return false;
        }



        public string FormatMailBody<T>(string templateData, T model)
        {
            string mailBody = templateData;
            if (model != null)
            {

                foreach (PropertyInfo pi in model.GetType().GetProperties())
                {
                    string value = string.Empty;
                    if (pi.PropertyType == typeof(decimal) || pi.PropertyType == typeof(double))
                    {
                        decimal? d = Convert.ToDecimal(pi.GetValue(model, null));
                        value = d.GetValueOrDefault().ToString("#0.00");
                    }
                    else
                    {
                        value = Convert.ToString(pi.GetValue(model, null));
                    }
                    mailBody = mailBody.Replace("{" + pi.Name + "}", value);
                }
                // mailBody = mailBody.Replace("{MailSignature}", File.ReadAllText(templateFilePath + MailSignature));
            }
            return mailBody;
        }

        public bool SendSMS<T>(SMSTemplateMasterVM template, string MobileNo, T Parameter)
        {
            try
            {
                SMSChillyHelpler smsHelper = new SMSChillyHelpler();
                string msgBody = FormatMailBody<T>(template.Body, Parameter);
                return smsHelper.SMSChillySendMessage(msgBody, MobileNo, null);
            }
            catch (Exception e)
            { }
            return false;
        }

    }
}