using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
namespace QamarLabs.Microservices.FundEntities.Views.MongoDb
{
    public class VwStartupFounder
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId AccountId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int Age { get; set; }
        public VwLocation? Location { get; set; }
        public VwCommunityLeader? Organization { get; set; }
    }
}
