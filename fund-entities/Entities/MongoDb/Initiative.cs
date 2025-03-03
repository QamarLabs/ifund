﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QamarLabs.Microservices.FundEntities.Entities.MongoDb
{
    public record Initiative: Entity
    {
        [Required(ErrorMessage = "Name is required.")]
        [BsonRequired]
        public string? Name { get; init; }
        [Required(ErrorMessage = "Description is required.")]
        [BsonRequired]
        public string? Description { get; init; }
        public ObjectId LocationId { get; init; }
        public int NumberOfFunders { get; init; }
        public int AmountFunded { get; init; }
        public int? Goal { get; init; }
        public bool ReachedGoal { get; init; }
        public ObjectId CommunityLeaderId { get; init; }
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime FundEndDate { get; init; }
        public ObjectId DistributionTypeId { get; init; }
    }
}
