﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using NLog.Web;

namespace QREntry.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var logger = services.GetRequiredService<ILogger<Program>>();

                logger.LogInformation("Application Start");

                try
                {
                    //var context = services.GetRequiredService<ComputerContext>();

                    //var dbInitializer = services.GetRequiredService<DbInitializer>();

                    //dbInitializer.Initialize(context);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }

                host.Run();
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)

                //Microsoft Logging Providor
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
                    logging.AddAzureWebAppDiagnostics();
                    logging.AddDebug();
                })
                // NLog: setup NLog for Dependency injection
                .UseNLog()

                .ConfigureAppConfiguration((webHostBuilderContext, configurationbuilder) =>
                {
                    var environment = webHostBuilderContext.HostingEnvironment;
                    string pathOfCommonSettingsFile = Path.Combine(environment.ContentRootPath, "..", @"QREntry.Library\Common");
                    configurationbuilder
                            .AddJsonFile("appSettings.json", optional: true)
                            .AddJsonFile(Path.Combine(pathOfCommonSettingsFile, "CommonSettings.json"), optional: true);

                    configurationbuilder.AddEnvironmentVariables();
                })

                .UseStartup<Startup>()

                .Build();
    }
}