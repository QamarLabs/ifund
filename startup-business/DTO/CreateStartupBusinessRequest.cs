using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace startup_business.DTO
{
    public class CreateStartupBusinessRequest
    {
        [JsonProperty("name", Required = Required.Always)]
        public string? Name { get; set; }
        [JsonProperty("description", Required = Required.Always)]
        public string? Description { get; set; }
        [JsonProperty("startupFounderId", Required = Required.Always)]
        public string StartupFounderId { get; set; }
        [JsonProperty("servicesProvided", Required = Required.Always)]
        public List<string> ServicesProvided { get; set; } = new List<string>();
        [JsonProperty("numberOfEmployees", Required = Required.Always)]
        public int NumberOfEmployees { get; set; }
        [JsonProperty("goal", Required = Required.Always)]
        public int Goal { get; set; }
        [JsonProperty("locationId", Required = Required.Always)]
        public string LocationId { get; set; }

    }
}
