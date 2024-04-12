using Newtonsoft.Json;

namespace initiatives.DTO
{
    public class PutInitiativeRequest
    {
        [JsonProperty("name", Required = Required.Default)]
        public string Name { get; set; }
        [JsonProperty("description", Required = Required.Default)]
        public string Description { get; set; }
        [JsonProperty("locationId", Required = Required.Default)]
        public string LocationId { get; set; }
        [JsonProperty("goal", Required = Required.Default)]
        public int? Goal { get; set; }
        [JsonProperty("distributionTypeId", Required = Required.Default)]
        public string DistributionTypeId { get; set; }
        [JsonProperty("fundEndDate", Required = Required.Default)]
        public DateTime FundEndDate { get; set; }
    }
}
