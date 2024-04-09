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
    public record StartupBusiness: Entity
    {
        [Required(ErrorMessage = "Name is required.")]
        [BsonRequired]
        public string? Name { get; init; }
        [Required(ErrorMessage = "Description is required.")]
        [BsonRequired]
        public string? Description { get; init; }
        public List<string> ServicesProvided { get; init; } = new List<string>();
        public int NumberOfEmployees { get; init; }
        public int AmountRaised { get; init; }
        public int NumberOfFunders { get; init; }
        public int Goal { get; init; }
        public bool? GoalReached { get; init; }
        public ObjectId StartupFounderId { get; init; }
        public ObjectId ProfitDistributionId { get; init ; }
        public bool IsPublic { get; init; } = false;
        public bool IsActive { get; init; } = true;
        public ObjectId LocationId { get; init; }
    }
}
