using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using iTSoft.CRM.Data.Repository;
using iTSoft.CRM.Domain.Services;
using iTSoft.HIMS.Service.Shared;

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


            ConfigureCRMRepositoryServices(services);


            // Scoped
            services.AddScoped<ILoginDetailService, LoginDetailService>();
            services.AddScoped<IListService, ListService>();



       
        }

        private static void ConfigureCRMRepositoryServices(IServiceCollection services)
        {
            services.AddScoped<IListRepository, ListRepository>();
        }
    }
}
