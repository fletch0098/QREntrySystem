using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using NLog.Web;
using Swashbuckle.AspNetCore.Swagger;

namespace QREntry.WebAPI
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
            // Add framework services.

            //EF DB
            //services.AddDbContext<ComputerContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
            //b => b.MigrationsAssembly("ComputerWebAPI")));

            //In-Memory
            //services.AddDbContext<TicTactoeDbContext>(opt => opt.UseInMemoryDatabase("TicTactoeDb"));

            //DI
            //services.AddSingleton(typeof(IDataRepository<Computer, long>), typeof(ComputerManager));
            //services.AddTransient(typeof(IDataRepository<Computer, long>), typeof(ComputerManager));
            //services.AddSingleton(typeof(IDataRepository<Memory, long>), typeof(MemoryManager));
            //services.AddTransient(typeof(IDataRepository<Memory, long>), typeof(MemoryManager));
            //services.AddTransient<ComputerManager>();
            //services.AddTransient<DbInitializer>();
            //services.AddTransient<ComputerLibrary.Business_Logic.ComputerBAL>();

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("LocalDev",
                    policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });

            //JSON LOOPS
            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            //MVC With Options
            services.AddMvc(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("LocalDev"));
            });

            //Swagger API
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = Configuration.GetSection("MySettings")["AppName"] + " API ", Version = Configuration.GetSection("MySettings")["Version"] });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            //DEV Setting
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //SWAGGER
            app.UseSwagger(c =>
            {
                c.PreSerializeFilters.Add((swagger, httpReq) => swagger.Host = httpReq.Host.Value);
            });

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", Configuration.GetSection("MySettings")["AppName"] + " API " + Configuration.GetSection("MySettings")["Version"]);
            });

            app.UseMvc(routes =>
            {
                //TODO: Needed?
                routes.MapRoute(
                name: "default",
                template: "{controller}/{action}/{id?}",
                defaults: new { controller = "default", action = "Index" });
            });

            //Configure Log
            env.ConfigureNLog("nlog.config");
        }
    }
}
