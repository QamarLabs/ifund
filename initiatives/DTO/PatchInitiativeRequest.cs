using Newtonsoft.Json;

namespace initiatives.DTO
{
    public class PatchInitiativeRequest
    {
        [JsonProperty("distributionTypeId", Required = Required.Default)]
        public string? DistributionTypeId { get; set; }
        [JsonProperty("fundEndDate", Required = Required.Default)]
        public DateTime? FundEndDate { get; set; }
    }
}
