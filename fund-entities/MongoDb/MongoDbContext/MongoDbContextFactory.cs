using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static QamarLabs.Microservices.FundEntities.ServiceBootstrap;

namespace QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext
{
    public class MongoDbContextFactory : IMongoDbContextFactory, IDisposable
    {
        private List<MongoDbContext> Contexts { get; } = new List<MongoDbContext>();
        private IConfiguration Configuration { get; }
        private FundCredentials FundCredentials { get; }

        public MongoDbContext CreateMongoDbContext()
        {
            var mongoDbConfig = Configuration.GetMongoDbConfig() ?? JsonConvert.DeserializeObject<MongoDbConfiguration>(Configuration.GetSection("MongoDbConfig").Value ?? "") ?? new MongoDbConfiguration();

            var creds = FundCredentials.Credentials;
            // Create a context instance
            var dbContext = new MongoDbContext(mongoDbConfig.Host, creds.DefaultDatabase ?? mongoDbConfig.DatabaseName);

            return dbContext;
        }

        public void Dispose()
        {
            foreach (var context in Contexts)
                context.Dispose();

            GC.SuppressFinalize(this);
        }
    }
}
