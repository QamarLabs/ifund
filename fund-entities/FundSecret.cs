using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fund_entities
{
    public class FundSecret
    {
        [JsonProperty("username", Required = Required.Always)]
        public string Username { get; set; }

        [JsonProperty("password", Required = Required.Always)]
        public string Password { get; set; }

        [JsonProperty("defaultDatabase", Required = Required.Always)]
        public string DefaultDatabase { get; set; }

        public string ToSqlConnectionString(string hostAddress)
        {
            return $"Data Source={hostAddress};Initial Catalog={DefaultDatabase};User ID={Username};Password={Password};TrustServerCertificate=true;Encrypt=false";
        }
    }
}
