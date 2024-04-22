using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace QamarLabs.Microservices.FundEntities.Views.MongoDb
{
    public class VwLocation
    {
        public string? City { get; init; } = string.Empty;
        public string? StateOrProvince { get; init; } = string.Empty;
        public string? Country { get; init; } = string.Empty;
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        public string? Geohash { get; set; } = string.Empty;
    }
}
