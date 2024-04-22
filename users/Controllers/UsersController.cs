using Microsoft.AspNetCore.Mvc;
using QamarLabs.Microservices.FundEntities.Entities.MongoDb;
using QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext;
using QamarLabs.Microservices.FundEntities.Views.MongoDb;

namespace QamarLabs.Microservices.Users.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {

        [HttpGet("community-leaders", Name = "GetCommunityLeaders")]
        public IEnumerable<VwCommunityLeader> GetCommunityLeaders(
               [FromServices] MongoDbContext mongoContext
            )
        {
            return new List<VwCommunityLeader>();
        }

        [HttpGet("startup-founders", Name = "GetStartupFounders")]
        public IEnumerable<VwStartupFounder> GetStartupFounders(
               [FromServices] MongoDbContext mongoContext
            )
        {
            return new List<VwStartupFounder>();
        }
    }
}
