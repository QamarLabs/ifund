using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fund_entities
{
    public class FundContextFactory : IHalContextFactory, IDisposable
    {
        private List<FundContext> Contexts { get; } = new List<FundContext>();
        private IConfiguration Configuration { get; }
        private FundCredentials FundCredentials { get; }

        public FundContextFactory(IConfiguration config, HalCredentials halCredentials)
        {
            this.Configuration = config;
            this.HalCredentials = halCredentials;
        }

        public FundContext CreateDbContext()
        {
            var halConfig = Configuration.GetSection("FundConfig").Get<FundConfiguration>();

            var creds = FundCredentials.Credentials;

            var connectionString = string.Format("Data Source={0};Initial Catalog={1};User ID={2};Password={3};TrustServerCertificate=true;Encrypt=false",
            halConfig.Host, creds.DefaultDatabase, creds.Username, creds.Password);

            var options = new DbContextOptionsBuilder<HalContext>();

            options.UseLazyLoadingProxies();
            options.UseSqlServer(connectionString);

            // currently bugged. doesnt play well with async code
            options.AddXRayInterceptor();

            var halContext = new FundContext(options.Options, null);

            Contexts.Add(halContext);

            return halContext;
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
