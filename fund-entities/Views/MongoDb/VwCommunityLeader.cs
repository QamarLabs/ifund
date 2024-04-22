using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using QamarLabs.Microservices.FundEntities.Entities.MongoDb;

namespace QamarLabs.Microservices.FundEntities.Views.MongoDb
{
    public class VwCommunityLeader
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId AccountId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public int Age { get; set; }
        public int CredibilityScore { get; set; } = 0;
        public VwLocation? Location { get; set; } 
        public VwCommunityLeader? Organization { get; set; }
    }
}
