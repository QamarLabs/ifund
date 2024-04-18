using System;
using MongoDB.Driver;

namespace QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext
{

    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }

        private bool _disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    // Dispose managed resources, if any
                    // Note: The MongoDB driver manages its own resources and doesn't require manual disposal
                }

                // Dispose unmanaged resources, if any
                // For simplicity, there are no unmanaged resources in this example

                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }

}
