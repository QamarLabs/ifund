using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QamarLabs.Microservices.FundEntities.Views.MongoDb
{
    public class VwStartupBusiness
    {
        public string? StartupBusinessId { get; init; }
        public string? Name { get; init; }
        public string? Description { get; init; }
        public List<string> ServicesProvided { get; init; } = new List<string>();
        public string? City { get; init; }
        public string? State { get; init; }
        public int AmountRaised { get; init; }
        public int NumberOfFunders { get; init; }
        public int Goal { get; init; }
        public bool IsPublic { get; init; } = false;
        public bool IsActive { get; init; } = true;
        public VwOrganization Organization { get; init; }
    }
}
