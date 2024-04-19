using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using QamarLabs.Microservices.FundEntities.Entities.MongoDb;
using QamarLabs.Microservices.Common.DTO;
using QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext;

namespace common.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILogger<LocationController> _logger;

        public LocationController(ILogger<LocationController> logger)
        {
            _logger = logger;
        }


        [HttpPost(Name = "CreateLocation")]
        public async Task CreateLocation(
         [FromServices] MongoDbContext mongoContext,
         [FromBody] CreateLocationRequest req,
         CancellationToken cancellationToken)
        {
          
            var locationCollection = mongoContext.GetCollection<Location>("locations");
            var newLocation = new Location()
            {
                City = req.City ?? "",
                StateOrProvince = req.StateOrProvince ?? "",
                Country = req.Country ?? "",
                Latitude = req.Latitude,
                Longitude = req.Longitude,
                Geohash = req.Geohash
            };
            await locationCollection.InsertOneAsync(newLocation);
            
        }
    }
}
