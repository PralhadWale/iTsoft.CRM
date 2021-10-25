using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

namespace iTSoft.CRM.Web
{
    public class Program
    {
        static public IConfigurationRoot Configuration { get; set; }
        public static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            Configuration = builder.Build();

            ApplicationSettings.ConnectionString = Configuration.GetConnectionString("DefaultConnection");

            ApplicationSettings.TokenSymetricKey = Configuration["JWT:KEY"];
            ApplicationSettings.TokenIssuer = Configuration["JWT:Issuer"];
            ApplicationSettings.TokenAudience = Configuration["JWT:Issuer"];
            ApplicationSettings.RootPath = System.AppDomain.CurrentDomain.BaseDirectory;

            Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(Configuration)
            .WriteTo.RollingFile(Path.Combine(ApplicationSettings.RootPath + @"\Logs\", "log-{Date}.txt"))
            .CreateLogger();



            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
