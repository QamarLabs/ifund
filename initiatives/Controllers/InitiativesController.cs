using Amazon.Runtime.Internal;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using QamarLabs.Microservices.FundEntities.Entities.MongoDb;
using QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext;
using QamarLabs.Microservices.FundEntities.Views.MongoDb;
using QamarLabs.Microservices.Initiatives.DTO;
using System.Collections;
using System.Reflection;

namespace QamarLabs.Microservices.Initiatives.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InitiativesController : ControllerBase
    {

        [HttpPost(Name = "SearchInitiatives")]
        public async Task<List<VwInitiative>> SearchInitiatives(
            [FromServices] MongoDbContext mongoContext,
            [FromBody] SearchInitiativeRequest req,
            CancellationToken cancellationToken)
        {

        }

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

        [HttpPut("{id}", Name = "UpdateInitiative")]
        public async Task UpdateInitiative(
            [FromServices] MongoDbContext mongoContext,
            [FromBody] PutInitiativeRequest req,
            string id,
            CancellationToken cancellationToken)
        {
            var initiativesCollection = mongoContext.GetCollection<Initiative>("initiatives");
            var filterDefinition = Builders<Initiative>.Filter.Eq("id", id);
            var putRequestType = req.GetType();
            var updateDefinition = Builders<Initiative>.Update.Combine();

            foreach (PropertyInfo property in putRequestType.GetProperties())
            {
                // Get the property name and value
                string propertyName = property.Name;
                object propertyValue = property.GetValue(req);

                // Add the property update to the update definition
                updateDefinition = updateDefinition.Set(propertyName, propertyValue);
            }

            await initiativesCollection.FindOneAndUpdateAsync<Initiative>(filterDefinition, updateDefinition, null, cancellationToken);
        }

        [HttpPatch("{id}", Name = "UpdateInitiativeFundEndDate")]
        public async Task UpdateInitiativeFundEndDate(
            [FromServices] MongoDbContext mongoContext,
            [FromBody] PatchInitiativeRequest req,
            string id,
            CancellationToken cancellationToken)
        {
            if (req.FundEndDate == null) throw new BadHttpRequestException("Need to provide a fund end date.");
            var initiativesCollection = mongoContext.GetCollection<Initiative>("initiatives");
            var filterDefinition = Builders<Initiative>.Filter.Eq("id", id);
            var updateDefinition = Builders<Initiative>.Update.Combine();

            updateDefinition = updateDefinition.Set("fundEndDate", req.FundEndDate);

            await initiativesCollection.FindOneAndUpdateAsync<Initiative>(filterDefinition, updateDefinition, null, cancellationToken);
        }
    }
}
