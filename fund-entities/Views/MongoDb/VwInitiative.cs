using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QamarLabs.Microservices.FundEntities.Views.MongoDb
{
    public class VwInitiative
    {
        public string? InitiativeId { get; init; }
        public string? Name { get; init; }
        public string? Description { get; init; }
        public string? City { get; init; }
        public string? State { get; init; }
        public DateTime? FundEndDate { get; init; }
        public VwOrganization Organization { get; init; }
    }
}
