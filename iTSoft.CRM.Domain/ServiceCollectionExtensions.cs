using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using iTSoft.CRM.Data.Repository;
using iTSoft.CRM.Domain.Services;

namespace iTSoft.CRM.Domain
{
    /// <summary>
    /// For Dependency Injection
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureCRMDomainServices(this IServiceCollection services)
        {
            // Services (Domain)

            // Singleton

            // Scoped
            services.AddScoped<ILoginDetailService, LoginDetailService>();
          
        }
    }
}
