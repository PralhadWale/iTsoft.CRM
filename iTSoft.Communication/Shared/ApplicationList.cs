using iTSoft.Communication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.Communication.Service.Helpers
{
    public class ApplicationList
    {
       

        private static List<EmailTemplateMasterVM> _EmailTemplateMasters;
        public static List<EmailTemplateMasterVM> EmailTemplateMasters
        {
            get
            {
                if (_EmailTemplateMasters == null)
                {
                    try
                    {
                       // _EmailTemplateMasters = new TemplateRepository().GetAllEmailTemplate();
                    }
                    catch
                    {

                    }
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
                if (_SMSTemplateMaster == null)
                {
                    try
                    {
                    //    _SMSTemplateMaster = new TemplateRepository().GetAllSMSTemplate();
                    }
                    catch
                    {

                    }
                }
                return _SMSTemplateMaster;
            }
            set
            {
                _SMSTemplateMaster = value;
            }
        }
    }
}
