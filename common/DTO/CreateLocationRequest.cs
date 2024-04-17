using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace QamarLabs.Microservices.Common.DTO
{
    public class CreateLocationRequest

    {
        [JsonProperty("city", Required = Required.Default)]
        public string? City { get; set; } = string.Empty;
        [JsonProperty("stateOrProvince", Required = Required.Default)]
        public string? StateOrProvince { get; set; } = string.Empty;
        [JsonProperty("country", Required = Required.Default)]
        public string? Country { get; set; } = string.Empty;

        [JsonProperty("latitude", Required = Required.Always)]
        public double Latitude { get; set; }

        [JsonProperty("longitude", Required = Required.Always)]
        public double Longitude { get; set; }

        [JsonProperty("getHash", Required = Required.Always)]
        public string Geohash { get; set; } = string.Empty;
    }
}
