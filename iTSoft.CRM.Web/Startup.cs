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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

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

            ConfigureAuthentication(services);

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
            //app.UseStaticFiles();
            //if (!env.IsDevelopment())
            //{
            //    app.UseSpaStaticFiles();
            //}
          
            app.UseRouting();
            app.UseCors("CRM");

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endPoints =>
            {
                endPoints.MapControllerRoute(
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

        private static void ConfigureAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = ApplicationSettings.TokenIssuer,
                    ValidAudience = ApplicationSettings.TokenAudience,
                    IssuerSigningKey = JwtSecurityKey.Create(ApplicationSettings.TokenSymetricKey)
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine("OnAuthenticationFailed: " + context.Exception.Message);
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("OnTokenValidated: " + context.SecurityToken);
                        return Task.CompletedTask;
                    }
                };
            });



            services.AddAuthorization();
        }

    }

     public static class JwtSecurityKey
    {
        public static SymmetricSecurityKey Create(string secret)
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
        }
    }

    public sealed class JwtToken
    {
        private JwtSecurityToken token;

        internal JwtToken(JwtSecurityToken token)
        {
            this.token = token;
        }

        public DateTime ValidTo => token.ValidTo;
        public string Value => new JwtSecurityTokenHandler().WriteToken(this.token);
    }

    public sealed class JwtTokenBuilder
    {
        private SecurityKey securityKey = null;
        private string subject = "";
        private string issuer = "";
        private string audience = "";
        private List<Claim> claims = new List<Claim>();
        private int expiryInMinutes = 5;

        public JwtTokenBuilder AddSecurityKey(SecurityKey securityKey)
        {
            this.securityKey = securityKey;
            return this;
        }

        public JwtTokenBuilder AddSubject(string subject)
        {
            this.subject = subject;
            return this;
        }

        public JwtTokenBuilder AddIssuer(string issuer)
        {
            this.issuer = issuer;
            return this;
        }

        public JwtTokenBuilder AddAudience(string audience)
        {
            this.audience = audience;
            return this;
        }

        public JwtTokenBuilder AddClaim(Claim claim)
        {
            this.claims.Add(claim);
            return this;
        }

        public JwtTokenBuilder AddClaims(List<Claim> lstClaim)
        {
            this.claims.Union(lstClaim);
            return this;
        }

        public JwtTokenBuilder AddExpiry(int expiryInMinutes)
        {
            this.expiryInMinutes = expiryInMinutes;
            return this;
        }

        public JwtToken Build()
        {
            EnsureArguments();

            var claims = new List<Claim>
            {
              new Claim(JwtRegisteredClaimNames.Sub, this.subject),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }
            .Union(this.claims);

            var token = new JwtSecurityToken(
                              issuer: this.issuer,
                              audience: this.audience,
                              claims: claims,
                              expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                              signingCredentials: new SigningCredentials(
                                                        this.securityKey,
                                                        SecurityAlgorithms.HmacSha256));

            return new JwtToken(token);
        }

        #region " private "

        private void EnsureArguments()
        {
            if (this.securityKey == null)
                throw new ArgumentNullException("Security Key");

            if (string.IsNullOrEmpty(this.subject))
                throw new ArgumentNullException("Subject");

            if (string.IsNullOrEmpty(this.issuer))
                throw new ArgumentNullException("Issuer");

            if (string.IsNullOrEmpty(this.audience))
                throw new ArgumentNullException("Audience");
        }

        #endregion
    }
}
