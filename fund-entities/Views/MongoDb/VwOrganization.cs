using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace QamarLabs.Microservices.FundEntities.Views.MongoDb
{
    public class VwOrganization
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public VwLocation? HeadquarterLocation { get; set; }
    }
}
