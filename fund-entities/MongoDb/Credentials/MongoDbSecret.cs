﻿using Newtonsoft.Json;
namespace QamarLabs.Microservices.FundEntities.MongoDb.Credentials
{
    public class MongoDbSecret
    {
        [JsonProperty("connectionString", Required = Required.Always)]
        public string? ConnectionString { get; set; }

        [JsonProperty("database", Required = Required.Always)]
        public string? Database { get; set; }
    }
}
