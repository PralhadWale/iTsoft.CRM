using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using iTSoft.CRM.Domain.Services;
using AutoMapper;
using iTSoft.CRM.Domain.Mapping;
using iTSoft.CRM.Data.Context;
using Microsoft.EntityFrameworkCore;
using iTSoft.CRM.Data.Repository;
using System;
using iTSoft.CRM.Domain;
using iTSoft.CRM.Data;
using iTSoft.CRM.Data.Helpers;
using System.Data.Common;
using iTSoft.CRM.Data.Entity;
using Newtonsoft.Json.Serialization;

namespace iTSoft.CRM.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var CRMConnectionStringVar = Configuration["CRMConnectionString"];
            ApplicationSettings.ConnectionString = Configuration["CRMConnectionString"]; 

            services.AddDbContext<CRMContext>(options =>
            options.UseSqlServer(CRMConnectionStringVar));
           
          

            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                  {
                      options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                      options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                  }
                   
            );

            services.AddCors(options => {
                options.AddPolicy("CRM", builder => builder
                 .WithOrigins("*")
                 .SetIsOriginAllowed((host) => true)
                 .AllowAnyMethod()
                 .AllowAnyHeader());
            });

            // In production, the Angular files will be served from this directory
            //services.AddSpaStaticFiles(configuration =>
            //{
            //    configuration.RootPath = "ClientApp/dist";
            //});


            services.AddAutoMapper(typeof(CRMMapping));
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            //services.AddScoped<ILoginDetailService, LoginDetailService>();
            // all services add scoped will be moved to below method, Need to discuss and refactor
            services.ConfigureCRMDomainServices();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            // all repositories add scoped will be moved to below method, Need to discuss and refactor
            services.CongfigureCRMDataServices();
            services.AddScoped<ICRMDapper, CRMDapper>();

            DbProviderFactories.RegisterFactory("System.Data.SqlClient", System.Data.SqlClient.SqlClientFactory.Instance);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

         //   app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }
          
            app.UseRouting();
            app.UseCors("CRM");

            app.UseEndpoints(endCRMnts =>
            {
                endCRMnts.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            //app.UseSpa(spa =>
            //{
            //    // To learn more about options for serving an Angular SPA from ASP.NET Core,
            //    // see https://go.microsoft.com/fwlink/?linkid=864501

            //    spa.Options.SourcePath = "ClientApp";

            //    if (env.IsDevelopment())
            //    {
            //        //  spa.UseAngularCliServer(npmScript: "start");

            //        // In order to use below binding, start angular server from command line by typing 
            //        // npm start 
            //        // from within ClientApp folder

            //        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
            //    }
            //});
        }
    }
}
