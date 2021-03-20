using iTSoft.Communication.Models;
using iTSoft.Communication.Service.Helpers;
using iTSoft.CRM.Domain.Services.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.CRM.Domain.Models
{
    public class NotificationTemplateList
    {
       
        private static List<EmailTemplateMasterVM> _EmailTemplateMasters;
        public static List<EmailTemplateMasterVM> EmailTemplateMasters
        {
            get
            {
                if( _EmailTemplateMasters == null)
                {
                    NotificationService notificationService = new NotificationService();
                    notificationService.SetNotificationSettings();
                }
                return _EmailTemplateMasters;
            }
            set
            {
                _EmailTemplateMasters = value;
            }
        }

        private static List<SMSTemplateMasterVM> _SMSTemplateMaster;
        public static List<SMSTemplateMasterVM> SMSTemplateMaster
        {
            get
            {
                return _SMSTemplateMaster;
            }
            set
            {
                _SMSTemplateMaster = value;
            }
        }
    }
}
