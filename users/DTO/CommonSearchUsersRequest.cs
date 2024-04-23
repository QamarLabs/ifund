using Newtonsoft.Json;
using QamarLabs.Microservices.Common.DTO;
namespace QamarLabs.Microservices.Users.DTO
{
    public class CommonSearchUsersRequest: CommonSearchRequest
    {
        [JsonProperty("email", Required = Required.Default)]
        public string? Email { get; set; }

        [JsonProperty("phoneNumber", Required = Required.Default)]
        public string? PhoneNumber { get; set; }

        [JsonProperty("firstName", Required = Required.Default)]
        public string? FirstName { get; set; }

        [JsonProperty("lastName", Required = Required.Default)]
        public string? LastName { get; set; }

        [JsonProperty("age", Required = Required.Default)]
        public int? Age { get; set; }

        [JsonProperty("city", Required = Required.Default)]
        public string? City { get; set; }

        [JsonProperty("stateOrProvince", Required = Required.Default)]
        public string? StateOrProvince { get; set; }

        [JsonProperty("country", Required = Required.Default)]
        public string? Country { get; set; }

        [JsonProperty("organization", Required = Required.Default)]
        public string? Organization { get; set; }
    }
}
