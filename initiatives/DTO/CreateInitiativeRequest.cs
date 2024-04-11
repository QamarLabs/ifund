
using Newtonsoft.Json;

namespace initiatives.DTO
{
    public class CreateInitiativeRequest
    {
        [JsonProperty("communityLeaderId", Required = Required.Always)]
        public string CommunityLeaderId { get; set; }
        [JsonProperty("name", Required = Required.Always)]
        public string Name { get; set; }
        [JsonProperty("description", Required = Required.Always)]
        public string Description { get; set; }
        [JsonProperty("locationId", Required = Required.Always)]
        public string LocationId { get; set; }
        [JsonProperty("goal", Required = Required.Default)]
        public int? Goal { get; set; }
        [JsonProperty("distributionTypeId", Required = Required.Always)]
        public string DistributionTypeId { get; set; }
        [JsonProperty("fundEndDate", Required = Required.Always)]
        public DateTime FundEndDate { get; set; }

    }
}
