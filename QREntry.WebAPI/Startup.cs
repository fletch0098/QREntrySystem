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
using QREntry.Library.Helpers;
using QREntry.WebAPI.Extensions;
using Microsoft.Extensions.Options;
using QREntry.WebAPI.Authentication;
using System.Net;
using System;


using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace QREntry.WebAPI
{
    public class Startup
    {
        private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //EF DB
            //services.AddDbContext<MyAppContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
            //b => b.MigrationsAssembly("QREntry.DataAccess")));

            //EF In-Memory
            services.AddDbContext<MyAppContext>(opt => opt.UseInMemoryDatabase("QREntryApp"));

            //DI
            services.AddSingleton(typeof(IDataRepository<ControlledEntry, int>), typeof(ControlledEntryManager));
            services.AddTransient(typeof(IDataRepository<ControlledEntry, int>), typeof(ControlledEntryManager));
            services.AddTransient<DbInitializer>();

            //AppSettings
            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);
            
            //Constants
            var constants = Configuration.GetSection("Constants");
            services.Configure<Constants>(constants);

            //CORS
            services.AddCors(options =>
            {
                options.AddPolicy("LocalWorkDev",
                    policy => policy.WithOrigins("https://localhost:44311").WithHeaders("Content-Type", "Authorization").AllowAnyMethod().AllowCredentials());

                options.AddPolicy("LocalHomeDev",
                    policy => policy.WithOrigins("https://localhost:44363").WithHeaders("Content-Type", "Authorization").AllowAnyMethod().AllowCredentials());
            });

            //services.AddCors(options =>
            //{
            //    options.AddPolicy("CorsPolicyLocal",
            //CORSbuilder =>
            //{
            //    CORSbuilder.AllowAnyMethod().AllowAnyHeader()
            //           .WithOrigins()
            //           .AllowCredentials();
            //});

            //});


            //MVC With Options
            //services.AddMvc(options =>
            //{
            //    options.Filters.Add(new CorsAuthorizationFilterFactory("LocalDev"));
            //});
            services.Configure<MvcOptions>(options =>
            {
                options.Filters.Add(new CorsAuthorizationFilterFactory("LocalHomeDev"));
            });


            //END CORS


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //JSON LOOPS
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });


            //Swagger API
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = appSettings["AppName"] + " API ", Version = appSettings["Version"] });
            });


            //Authtntication
            services.TryAddTransient<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IJwtFactory, JwtFactory>();

            // add identity
            var builder = services.AddIdentityCore<AppUser>(o =>
            {
                // configure identity options
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 6;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<MyAppContext>().AddDefaultTokenProviders();

            services.AddAutoMapper();
            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            // Get options from app settings
            var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = false,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = false,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // api user claim policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.JwtClaimIdentifiers.Rol, Constants.JwtClaims.ApiAccess));
            });

            //services.AddHttpsRedirection(options =>
            //{
            //    options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
            //    options.HttpsPort = 5001;
            //});
        

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

            // Shows UseCors with named policy.
            app.UseCors("LocalHomeDev");

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
                c.SwaggerEndpoint("/swagger/v1/swagger.json", Configuration.GetSection("AppSettings")["AppName"] + " API " + Configuration.GetSection("AppSettings")["Version"]);
            });

            //Configure Log
            env.ConfigureNLog("nlog.config");

            //Authentication
            app.UseExceptionHandler(builder => {
                builder.Run(
                    async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                        }
                    });
            });

            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();

        }
    }

}
