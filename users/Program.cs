using QamarLabs.Microservices.FundEntities;

var builder = WebApplication.CreateBuilder(args);
var fundConfig = builder.Configuration.GetFundConfig();
var mongoConfig = builder.Configuration.GetMongoDbConfig();
builder.Services.AddFundContext(fundConfig!, mongoConfig!);
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
