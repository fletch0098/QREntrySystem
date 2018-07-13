using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QREntry.Library.Common;

namespace QREntry.WebAPI
{
    public class AppSettings : Library.Common.AppSettings
    {
        public string enviroment { get; set; }
        public string appName { get; set; }
        public string url { get; set; }
    }
}
