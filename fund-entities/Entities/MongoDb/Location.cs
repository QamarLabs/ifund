using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QamarLabs.Microservices.FundEntities.Entities.MongoDb
{
    public record Location: Entity
    {
        public string? City { get; init; } = string.Empty;
        public string? StateOrProvince { get; init; } = string.Empty;
        public string? Country { get; init; } = string.Empty;

        [Required(ErrorMessage = "Latitude is required.")]
        [BsonRequired]
        public double Latitude { get; set; }
        [Required(ErrorMessage = "Longitude is required.")]
        [BsonRequired]
        public double Longitude { get; set; }
        [Required(ErrorMessage = "Geohash is required.")]
        [BsonRequired]
        public string Geohash { get; set; } = string.Empty;
    }
}
