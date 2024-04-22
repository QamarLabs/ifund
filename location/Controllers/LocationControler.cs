using Microsoft.AspNetCore.Mvc;

namespace QamarLabs.Microservices.Location.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationControler : ControllerBase
    {

        private readonly ILogger<LocationControler> _logger;

        public LocationControler(ILogger<LocationControler> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetLocation")]
        public IEnumerable<Location> GetLocation()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
