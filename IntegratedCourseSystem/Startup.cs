using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using IntegratedCourseSystem.Models;
using IntegratedCourseSystem.Extensions;
using System;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Antiforgery;
using System.Web;
using Microsoft.AspNetCore.Http;
using DataBase;


namespace IntegratedCourseSystem
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
            

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });


            // Yaroslav: Add db context (see [Extensions/IServiceCollectionExtensions.cs])
            services.AddIntegratedCourseSystemContext(Configuration);


            // установка конфигурации подключения
            services.AddAuthentication(options => {
                options.DefaultScheme = "Cookies";
            }).AddCookie("Cookies", options => {
                options.Cookie.Name = "auth_cookie";
                options.Cookie.SameSite = SameSiteMode.None;
                options.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = redirectContext =>
                    {
                        redirectContext.HttpContext.Response.StatusCode = 401;
                        return System.Threading.Tasks.Task.CompletedTask;
                    }
                };
            });

            /*
             * antiforgery token. didn't work.
             * 
            services.AddAntiforgery(options =>
            {
                // Set Cookie properties using CookieBuilder properties
                options.FormFieldName = "AntiforgeryFieldname";
                options.HeaderName = "X-CSRF-TOKEN";
                options.Cookie.Name = "X-CSRF-TOKEN";
                options.SuppressXFrameOptionsHeader = false;
                //options.Cookie.Name = "CSRF_Cookie";
                //options.Cookie.HttpOnly = false;
            });
            */
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
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
            app.UseMiddleware<AddUserMiddleware>();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();


            app.UseRouting();

            app.UseAuthentication();    // аутентификация
            app.UseAuthorization();     // авторизация

            /*
             * anti-forgery token. didn't work.
             * 
            app.Use(next => context =>
            {
                // The request token can be sent as a JavaScript-readable cookie, 
                // and Angular uses it by default.

                var tokens = antiforgery.GetAndStoreTokens(context);
                context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
                    new CookieOptions() { HttpOnly = false });
                return next(context);
            });
            */

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
