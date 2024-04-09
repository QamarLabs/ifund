using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QamarLabs.Microservices.FundEntities.Entities.MongoDb
{
    public record CommunityLeader: Entity
    {
        public ObjectId AccountId { get; init; }
        public ObjectId OrganizationId { get; init; }
        public int CredibilityScore { get; init; } = 0;
    }
}
