using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace QamarLabs.Microservices.FundEntities.Entities.MongoDb.Requests
{
    public class MongoFilterDefinition
    {
        public string Id { get; set; }
    }
}
