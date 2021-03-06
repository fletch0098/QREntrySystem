using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace QREntry.ReactUI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)

                //Appsetting
                .ConfigureAppConfiguration((webHostBuilderContext, configurationbuilder) =>
                {
                    var environment = webHostBuilderContext.HostingEnvironment;
                    string pathOfCommonSettingsFile = Path.Combine(environment.ContentRootPath, "..", @"QREntry.Library\Common");
                    configurationbuilder
                            .AddJsonFile("appSettings.json", optional: true)
                            .AddJsonFile(Path.Combine(pathOfCommonSettingsFile, "CommonSettings.json"), optional: true)
                            .AddJsonFile($"appsettings.{environment.EnvironmentName}.json", optional: true);

                    configurationbuilder.AddEnvironmentVariables();
                })

                .UseStartup<Startup>();
    }
}
