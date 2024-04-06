using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using static QamarLabs.Microservices.FundEntities.ServiceBootstrap;

namespace QamarLabs.Microservices.FundEntities
{
    public class FundContextFactory : IFundContextFactory, IDisposable
    {
        private List<FundContext> Contexts { get; } = new List<FundContext>();
        private IConfiguration Configuration { get; }
        private FundCredentials FundCredentials { get; }

        public FundContextFactory(IConfiguration config, FundCredentials fundCredentials)
        {
            this.Configuration = config;
            this.FundCredentials = fundCredentials;
        }

        public FundContext CreateDbContext()
        {
            var fundConfig = Configuration.GetFundConfig() ?? JsonConvert.DeserializeObject<FundConfiguration>(Configuration.GetSection("FundConfig").Value ?? "") ?? new FundConfiguration();

            var creds = FundCredentials.Credentials;

            var connectionString = $"Host={fundConfig.Host};Database={creds.DefaultDatabase};Username={creds.Username};Password={creds.Password};Trust Server Certificate=true";

            var optionsBuilder = new DbContextOptionsBuilder<FundContext>()
                .UseNpgsql(connectionString); // Use Npgsql for PostgreSQL

            var fundContext = new FundContext(optionsBuilder.Options);

            Contexts.Add(fundContext);

            return fundContext;
        }

        // implement async dispose eventually
        public void Dispose()
        {
            foreach (var context in Contexts)
                context.Dispose();

            GC.SuppressFinalize(this);
        }
    }
}
