using Serilog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
namespace iTSoft.CRM.Web.Helpers
{
    public class Logger
    {
        private static readonly ILogger _errorLogger;
        private static readonly ILogger _paymentLogger;

        //static Logger()
        //{
        //    _errorLogger = new LoggerConfiguration().WriteTo.File(Path.Combine(HttpContext.Current.Server.MapPath("~/logs/"), "log_ .txt"), rollingInterval: RollingInterval.Day).CreateLogger();
        //    _paymentLogger = new LoggerConfiguration().WriteTo.File(Path.Combine(HttpContext.Current.Server.MapPath("~/logs/"), "log_payment .txt"), rollingInterval: RollingInterval.Day).CreateLogger();
        //}

        public static ILogger GetLogger()
        {
            return _errorLogger;
        }

        public static ILogger GetPaymentLogger()
        {
            return _paymentLogger;
        }
    }
}
