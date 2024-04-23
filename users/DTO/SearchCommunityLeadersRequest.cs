using Newtonsoft.Json;

namespace QamarLabs.Microservices.Users.DTO
{
    public class SearchCommunityLeadersRequest: CommonSearchUsersRequest
    {
        [JsonProperty("credibilityScore", Required = Required.Default)]
        public int? CredibilityScore { get; set; }
    }
}
