using Newtonsoft.Json;

namespace QamarLabs.Microservices.Common.DTO
{
    public abstract class CommonSearchRequest
    {
        [JsonProperty("pageIndex", Required = Required.Always)]
        public int PageIndex { get; set; }
        [JsonProperty("numberOfPages", Required = Required.Always)]
        public int NumberOfPages { get; set; }
    }
}
