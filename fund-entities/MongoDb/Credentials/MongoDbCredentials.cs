using Microsoft.Extensions.Configuration;
namespace QamarLabs.Microservices.FundEntities.MongoDb.Credentials
{
    public class MongoDbCredentials
    {
        public IConfiguration Configuration { get; }
        public MongoDbSecret Credentials { get; }
    }
}
