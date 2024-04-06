using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading;

namespace QamarLabs.Microservices.FundEntities
{
    public class FundCredentialsService: BackgroundService
    {
        private IServiceScopeFactory ScopeFactory { get; }

        public FundCredentialsService(IServiceScopeFactory scopeFactory)
        {
            ScopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken cToken)
        {
            Console.WriteLine("To Be Continued......");
        }
    }
}
