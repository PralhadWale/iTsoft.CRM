using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public static class ApplicationSettings
    {
        public static string ConnectionString { get; set; }
        public static string ReportConnectionString { get; set; }
        public static string LogPath { get; set; }
        public static string UploadPath { get; set; }
        public static string AssetPath { get; set; }
        public static string TokenIssuer { get; set; }
        public static string TokenSymetricKey { get; set; }
        public static string TokenAudience { get; set; }
        public static string SmtpClientHostName { get; set; }
        public static string SmtpClientHostServerAddress { get; set; }
        public static int SmtpClientPort { get; set; }
        public static string GoogleAppId { get; set; }
        public static string PayTMCallBackURL { get; internal set; }
    }
}
