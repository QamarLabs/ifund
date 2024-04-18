namespace QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext
{
    public interface IMongoDbContextFactory
    {
        public MongoDbContext CreateMongoDbContext();
    }
}
