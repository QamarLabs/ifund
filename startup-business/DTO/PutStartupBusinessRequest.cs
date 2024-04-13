using Newtonsoft.Json;

namespace QamarLabs.Microservices.StartupBusinesses.DTO
{
    public class PutStartupBusinessRequest
    {
        [JsonProperty("name", Required = Required.Default)]
        public string? Name { get; set; }
        [JsonProperty("description", Required = Required.Default)]
        public string? Description { get; set; }
        [JsonProperty("locationId", Required = Required.Default)]
        public string? LocationId { get; set; }
        [JsonProperty("servicesProvided", Required = Required.Default)]
        public List<string>? ServicesProvided { get; set; }
        [JsonProperty("numberOfEmployees", Required = Required.Default)]
        public int? NumberOfEmployees { get; set; }
        [JsonProperty("goal", Required = Required.Default)]
        public int? Goal { get; set; }
        [JsonProperty("profitDistributionTypeId", Required = Required.Default)]
        public string? ProfitDistributionTypeId { get; set; }

    }
}
