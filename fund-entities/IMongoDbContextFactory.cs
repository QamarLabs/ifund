namespace QamarLabs.Microservices.FundEntities
{
    public interface IMongoDbContextFactory
    {
        public MongoDbContext CreateMongoDbContext();
    }
}
