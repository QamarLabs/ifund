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
    public record Account : Entity
    {
        [Required(ErrorMessage = "Email is required.")]
        [BsonRequired]
        public string Email { get; init; } = string.Empty;

        [Required(ErrorMessage = "Phone Number is required.")]
        [BsonRequired]
        public string PhoneNumber { get; init; } = string.Empty;

        [Required(ErrorMessage = "First Name is required.")]
        [BsonRequired]
        public string FirstName { get; init; } = string.Empty;

        [Required(ErrorMessage = "Last Name is required.")]
        [BsonRequired]
        public string LastName { get; init; } = string.Empty;
        
        [Required(ErrorMessage = "Age is required.")]
        [BsonRequired]
        public int Age { get; init; }

        public ObjectId LocationId { get; init; }
    }
}
