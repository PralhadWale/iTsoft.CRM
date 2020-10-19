using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using iTSoft.CRM.Data.Context;
using iTSoft.CRM.Data.Repository;

namespace iTSoft.CRM.Data
{
    public static class ServiceCollectionExtension
    {
        public static void ConfigureCRMDatabase(this IServiceCollection service,
            IConfiguration configuration, bool sensitiveLogging = true)
        {
            // Databae
            var connection = configuration.GetConnectionString("CRMConnectionString");
            service.AddDbContext<CRMContext>(options =>
            {
                options.UseSqlServer(connection, sqlServerOptions => sqlServerOptions.CommandTimeout(120));
                if (sensitiveLogging) options.EnableSensitiveDataLogging();
            });
        }

        public static void CongfigureCRMDataServices(this IServiceCollection services)
        {
            //Repositories
            // We can resolve all generic repositories in one statement
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }
    }
}
