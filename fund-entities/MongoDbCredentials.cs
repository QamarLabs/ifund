using Microsoft.Extensions.Configuration;
namespace QamarLabs.Microservices.FundEntities
{
    public class MongoDbCredentials
    {
        public IConfiguration Configuration { get; }
        public MongoDbSecret Credentials { get; }
    }
}
