using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QamarLabs.Microservices.FundEntities.Entities.MongoDb
{
    public record Organization: Entity
    {
        [Required(ErrorMessage = "Name is required")]
        [BsonRequired]
        public string Name { get; init; } = string.Empty;

        [Required(ErrorMessage = "Description is required")]
        [BsonRequired]
        public string Description { get; init; } = string.Empty;

        public ObjectId HeadquarterLocationId { get; init; }
    }
}
