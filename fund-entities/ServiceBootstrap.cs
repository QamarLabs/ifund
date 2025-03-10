﻿using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using QamarLabs.Microservices.FundEntities.MongoDb.MongoDbContext;

namespace QamarLabs.Microservices.FundEntities
{
    public static class ServiceBootstrap
    {
        public class FundConfiguration
        {
            public string SecretName { get; set; }
            public string Host { get; set; }
        }

        public class MongoDbConfiguration
        {
            public string Host { get; set; }
            public string DatabaseName { get; set; }
        }

        public static FundConfiguration? GetFundConfig(this IConfiguration configuration)
        {
            return JsonConvert.DeserializeObject<FundConfiguration>(configuration.GetSection("FundConfig").Value ?? "");
        }

        public static MongoDbConfiguration? GetMongoDbConfig(this IConfiguration configuration)
        {
            return JsonConvert.DeserializeObject<MongoDbConfiguration>(configuration.GetSection("MongoDbConfig").Value ?? "");
        }

        public static void AddFundContext(this IServiceCollection services, FundConfiguration fundConfig, MongoDbConfiguration mongoConfig)
        {

            services.AddSingleton<FundWarmState>();
            services.AddSingleton<FundCredentials>();
            services.AddHostedService<FundCredentialsService>();

            services.AddDbContext<FundContext>((sp, options) =>
            {
                //var creds = sp.GetService<FundCredentials>().Credentials;
                //var connectionString = creds.ToSqlConnectionString(fundConfig.Host);
                //options.UseLazyLoadingProxies();
                //Connect to postgresql database.
            });

            services.AddSingleton<MongoDbContext>(sp =>
            {
                var creds = sp.GetService<FundCredentials>().Credentials;
                var mongoConnectionString = creds.ToMongoConnectionString(mongoConfig.Host);
                // Get your MongoDB connection string and database name from your configuration
                // Create and return a new instance of MongoDbContext
                return new MongoDbContext(mongoConnectionString, mongoConfig.DatabaseName);
            });

            services.AddScoped<IFundContextFactory, FundContextFactory>();
        }

        /// <summary>
        /// should be updated to use semaphore
        /// </summary>
        public static async Task AwaitFundContextWarmUpAsync(this IServiceScopeFactory scopeFactory, CancellationToken cancellationToken = default)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                using var scope = scopeFactory.CreateScope();
                if (scope.ServiceProvider.GetRequiredService<FundWarmState>().IsWarm)
                    break;

                await Task.Delay(100);
            }
        }

        public static void WarmUpFundContext(this IApplicationBuilder app, string segmentName)
        {
            using var scope = app.ApplicationServices.CreateScope();
            //AWSXRayRecorder.Instance.BeginSegment(segmentName);
            try
            {
                scope.ServiceProvider.GetRequiredService<FundContext>().Database.ExecuteSqlRaw("SELECT COUNT(*) FROM ens_user");
                scope.ServiceProvider.GetRequiredService<FundWarmState>().IsWarm = true;
            }
            catch (Exception e)
            {
                //AWSXRayRecorder.Instance.AddException(e);
            }
            finally
            {
                //AWSXRayRecorder.Instance.EndSegment();
            }
        }

        /**
         * Helper function to get the connections db name, else return null.
         */
        public static string GetCurrentDatabaseName(this FundContext fundContext)
        {
            try
            {
                return fundContext.Database.GetDbConnection().Database;
            }
            catch
            {
                return null;
            }
        }
    }
}
