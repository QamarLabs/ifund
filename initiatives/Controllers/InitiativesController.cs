using initiatives.DTO;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using QamarLabs.Microservices.FundEntities;
using QamarLabs.Microservices.FundEntities.Entities.MongoDb;

namespace initiatives.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InitiativesController : ControllerBase
    {

        [HttpPost(Name = "CreateInitiative")]
        public async Task CreateInitiative(
            [FromServices] MongoDbContext mongoContext,
            [FromBody] CreateInitiativeRequest req, 
            CancellationToken cancellationToken)
        {
            var initiativesCollection = mongoContext.GetCollection<Initiative>("initiatives");
            await initiativesCollection.InsertOneAsync(
                new Initiative()
                {
                    CommunityLeaderId = ObjectId.Parse(req.CommunityLeaderId),
                    Name = req.Name,
                    Description = req.Description,
                    LocationId = ObjectId.Parse(req.LocationId),
                    Goal = req.Goal,
                    DistributionTypeId = ObjectId.Parse(req.DistributionTypeId),
                    FundEndDate = req.FundEndDate
                }
             );

        }

    }
}
