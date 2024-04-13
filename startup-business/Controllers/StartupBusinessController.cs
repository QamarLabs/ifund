using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using QamarLabs.Microservices.FundEntities;
using QamarLabs.Microservices.FundEntities.Entities.MongoDb;
using QamarLabs.Microservices.StartupBusinesses.DTO;
using System.Reflection;

namespace QamarLabs.Microservices.StartupBusinesses.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StartupBusinessController : ControllerBase
    {
        [HttpPost(Name = "CreateStartupBusinesses")]
        public async Task CreateStartupBusinesses(
            [FromServices] MongoDbContext mongoDbContext, 
            [FromBody] CreateStartupBusinessRequest req)
        {
            var startupBusinessCollection = mongoDbContext.GetCollection<StartupBusiness>("startup-businesses");

            await startupBusinessCollection.InsertOneAsync(
                new StartupBusiness()
                {
                    StartupFounderId = ObjectId.Parse(req.StartupFounderId),
                    Name = req.Name,
                    Description = req.Description,
                    NumberOfEmployees = req.NumberOfEmployees,
                    ServicesProvided = req.ServicesProvided,
                    Goal = req.Goal,
                    LocationId = ObjectId.Parse(req.LocationId)
                });
        }

        [HttpPut("{id}" , Name = "UpdateStartupBusinesses")]
        public async Task UpdateStartupBusinesses(
            [FromServices] MongoDbContext mongoDbContext,
            [FromBody] PutStartupBusinessRequest req,
            string id,
            CancellationToken cancellationToken)
        {
            var startupBusinessCollection = mongoDbContext.GetCollection<StartupBusiness>("startup-businesses");

            var filterDefinition = Builders<StartupBusiness>.Filter.Eq("id", id);

            var putRequestType = req.GetType();

            var updateDefinition = Builders<StartupBusiness>.Update.Combine();

            foreach(PropertyInfo propertyType in putRequestType.GetProperties())
            {
                var propertyName = propertyType.Name;
                var propertyValue = propertyType.GetValue(req);

                updateDefinition = updateDefinition.Set(propertyName, propertyValue);
            }

            await startupBusinessCollection.FindOneAndUpdateAsync<StartupBusiness>(filterDefinition, updateDefinition, null, cancellationToken);
        }
    }
}
