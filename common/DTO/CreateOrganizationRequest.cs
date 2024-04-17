using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace QamarLabs.Microservices.Common.DTO
{
    public class CreateOrganizationRequest
    {
        [JsonProperty("name", Required = Required.Always)]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("description", Required = Required.Always)]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("hqLocation", Required = Required.Always)]
        public CreateLocationRequest HqLocation { get; set; }

    }
}
