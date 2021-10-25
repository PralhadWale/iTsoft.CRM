using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;
using Serilog;
using Serilog.Context;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace iTSoft.CRM.Web.Middleware
{
    public class SerilogMiddleware
    {

        static readonly ILogger Log = Serilog.Log.ForContext<SerilogMiddleware>();

        readonly RequestDelegate _next;

        private static IConfiguration _configuration;

        public SerilogMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (httpContext == null) throw new ArgumentNullException(nameof(httpContext));

            var start = Stopwatch.GetTimestamp();

            try
            {
                using (LogContext.PushProperty("UserName", httpContext.User.Identity.Name)) { }
                using (LogContext.PushProperty("RemoteIpAddress", httpContext.Connection.RemoteIpAddress))
                {
                    await _next(httpContext);
                    var elapseMs = GetElapsedMilliseconds(start, Stopwatch.GetTimestamp());

                    var statusCode = httpContext.Response?.StatusCode;
                    var level = StatusCodeToLogEventLevel(statusCode);
           
                }
            }
            catch(Exception ex)
            {
                //Log Exception
                //else throw
                throw ex;
            }
        }

        public LogEventLevel StatusCodeToLogEventLevel(int? statusCode)
        {
            if (statusCode == null)
                return LogEventLevel.Information;
            if (statusCode == 401)
                return LogEventLevel.Information;
            if (statusCode < 400)
                return LogEventLevel.Information;
            if (statusCode < 500)
                return LogEventLevel.Warning;

            return LogEventLevel.Error;
        }


        static double GetElapsedMilliseconds(long start, long stop)
        {
            return (stop - start) * 1000 / (double)Stopwatch.Frequency;
        }

    }
}
