using Dapper;
using iTSoft.Communication.Models;
using iTSoft.CRM.Core.Cryptography;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Core
{
    public interface INotificationService
    {
        void SetNotificationSettings();
    }
    public class NotificationService : BaseRepository, INotificationService
    {

        public const string PROC_LoadCommunicationSettings = "PROC_LoadCommunicationSettings";
        public void SetNotificationSettings()
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                var result = dbConnection.QueryMultiple(PROC_LoadCommunicationSettings, null, commandType: CommandType.StoredProcedure);
                List<EmailTemplateMasterVM> emailTemplateMasterVMs = result.Read<EmailTemplateMasterVM>().AsList();
                SMTPSettings sMTPSettings = result.Read<SMTPSettings>().FirstOrDefault();

                if (sMTPSettings != null)
                {
                    foreach (var t in emailTemplateMasterVMs)
                    {
                        t.SMTPSettings = sMTPSettings;
                        t.Password = new EncryptionHelper().Decrypt(t.Password);
                    }
                }
                NotificationTemplateList.EmailTemplateMasters = emailTemplateMasterVMs;
            }
        }
    }
}
