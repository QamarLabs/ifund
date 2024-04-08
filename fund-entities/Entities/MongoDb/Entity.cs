using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace QamarLabs.Microservices.FundEntities.Entities.MongoDb
{
    public record Entity
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; init; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedDate { get; init; } = DateTime.UtcNow;
    }
}
