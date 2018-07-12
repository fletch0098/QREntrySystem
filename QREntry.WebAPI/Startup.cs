using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NLog.Web;
using Swashbuckle.AspNetCore.Swagger;
using QREntry.DataAccess;
using QREntry.DataAccess.RepositoryManager;
using QREntry.Library.Model;
using QREntry.Library.Common;

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
            //Add framework services.

            //EF DB
            //services.AddDbContext<MyAppContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
            //b => b.MigrationsAssembly("QREntry.DataAccess")));

            //EF In-Memory
            services.AddDbContext<MyAppContext>(opt => opt.UseInMemoryDatabase("QREntryApp"));

            //DI
            services.AddSingleton(typeof(IDataRepository<ControlledEntry, int>), typeof(ControlledEntryManager));
            services.AddTransient(typeof(IDataRepository<ControlledEntry, int>), typeof(ControlledEntryManager));
            services.AddTransient<DbInitializer>();


            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);

            var constants = Configuration.GetSection("Constants");
            services.Configure<Constants>(constants);

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("LocalDev",
                    policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //JSON LOOPS
            services.AddMvc().AddJsonOptions(options =>
            {
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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            //SWAGGER
            app.UseSwagger(c =>
            {
                c.PreSerializeFilters.Add((swagger, httpReq) => swagger.Host = httpReq.Host.Value);
            });

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", Configuration.GetSection("MySettings")["AppName"] + " API " + Configuration.GetSection("MySettings")["Version"]);
            });

            //Configure Log
            env.ConfigureNLog("nlog.config");

        }
    }
}
