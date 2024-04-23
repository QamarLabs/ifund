using Newtonsoft.Json;
using QamarLabs.Microservices.Common.DTO;

namespace QamarLabs.Microservices.Initiatives.DTO
{
    public class SearchInitiativeRequest: CommonSearchRequest
    {
        [JsonProperty("name", Required = Required.Default)]
        public string Name { get; set; }
        [JsonProperty("description", Required = Required.Default)]
        public string Description { get; set; }
        [JsonProperty("locationId", Required = Required.Default)]
        public string LocationId { get; set; }
    }
}
