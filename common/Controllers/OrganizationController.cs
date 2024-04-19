using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using QamarLabs.Microservices.FundEntities.Entities.MongoDb;
using QamarLabs.Microservices.Common.DTO;
using QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext;
using MongoDB.Driver;

namespace common.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrganizationController : ControllerBase
    {
        private readonly ILogger<OrganizationController> _logger;

        public OrganizationController(ILogger<OrganizationController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "CreateOrganization")]
        public async Task CreateOrganization(
            [FromServices] MongoDbContext mongoContext,
            [FromBody] CreateOrganizationRequest req,
            CancellationToken cancellationToken)
        {
            var organizationsCollection = mongoContext.GetCollection<Organization>("organizations");
            var locationCollection = mongoContext.GetCollection<Location>("locations");
            var newLocation = new Location()
            {
                City = req.HqLocation.City ?? "",
                StateOrProvince = req.HqLocation.StateOrProvince ?? "",
                Country = req.HqLocation.Country ?? "",
                Latitude = req.HqLocation.Latitude,
                Longitude = req.HqLocation.Longitude,
                Geohash = req.HqLocation.Geohash
            };
            var locationFilterCondition = Builders<Location>.Filter.Eq("geoHash", req.HqLocation.Geohash);
            await locationCollection.FindOneAndReplaceAsync(locationFilterCondition, newLocation);

            await organizationsCollection.InsertOneAsync(
                new Organization()
                {
                   Name = req.Name,
                   Description = req.Description,
                   HeadquarterLocationId = ObjectId.Parse(newLocation.Id),
                }
            );

        }

        [HttpPost(Name = "UpdateOrganization")]
        public async Task UpdateOrganization(
         [FromServices] MongoDbContext mongoContext,
         [FromBody] PutOrganizationRequest req,
         CancellationToken cancellationToken)
        {
            var organizationsCollection = mongoContext.GetCollection<Organization>("organizations");
            var locationCollection = mongoContext.GetCollection<Location>("locations");
            var newLocation = new Location()
            {
                City = req.HqLocation.City ?? "",
                StateOrProvince = req.HqLocation.StateOrProvince ?? "",
                Country = req.HqLocation.Country ?? "",
                Latitude = req.HqLocation.Latitude,
                Longitude = req.HqLocation.Longitude,
                Geohash = req.HqLocation.Geohash
            };

            var filterCondition = Builders<Location>.Filter.Eq("geoHash", req.HqLocation.Geohash);

            await locationCollection.FindOneAndReplaceAsync(filterCondition, newLocation);

            await organizationsCollection.InsertOneAsync(
                new Organization()
                {
                    Name = req.Name,
                    Description = req.Description,
                    HeadquarterLocationId = ObjectId.Parse(newLocation.Id),
                }
            );

        }
    }
}
