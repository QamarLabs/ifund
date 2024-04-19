using Newtonsoft.Json;

namespace QamarLabs.Microservices.Common.DTO
{
    public class PutOrganizationRequest
    {
        [JsonProperty("name", Required = Required.Default)]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("description", Required = Required.Default)]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("hqLocation", Required = Required.Default)]
        public CreateLocationRequest HqLocation { get; set; }
    }
}
