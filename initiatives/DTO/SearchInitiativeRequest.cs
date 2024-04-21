using Newtonsoft.Json;

namespace QamarLabs.Microservices.Initiatives.DTO
{
    public class SearchInitiativeRequest
    {
        [JsonProperty("name", Required = Required.Default)]
        public string Name { get; set; }
        [JsonProperty("description", Required = Required.Default)]
        public string Description { get; set; }
        [JsonProperty("locationId", Required = Required.Default)]
        public string LocationId { get; set; }
        [JsonProperty("pageIndex", Required = Required.Always)]
        public int PageIndex { get; set; }
        [JsonProperty("numberOfPages", Required = Required.Always)]
        public int NumberOfPages { get; set; }
    }
}
