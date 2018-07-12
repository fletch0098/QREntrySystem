using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QREntry.Library.Common
{
    public class Constants
    {
        public string AppTitle { get; set; }
        public string Version { get; set; }

        public static class JwtClaimIdentifiers
        {
            public const string Rol = "rol", Id = "id";
        }

        public static class JwtClaims
        {
            public const string ApiAccess = "api_access";
        }
    }
}