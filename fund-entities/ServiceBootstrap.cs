using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace QamarLabs.Microservices.FundEntities
{
    public static class ServiceBootstrap
    {
        public class FundConfiguration
        {
            public string SecretName { get; set; }
            public string Host { get; set; }
        }

        public static FundConfiguration? GetFundConfig(this IConfiguration configuration)
        {
            return JsonConvert.DeserializeObject<FundConfiguration>(configuration.GetSection("FundConfig").Value ?? "");
        }

        public static void AddFundContext(this IServiceCollection services, FundConfiguration fundConfig)
        {

            services.AddSingleton<FundWarmState>();
            services.AddSingleton<FundCredentials>();
            services.AddHostedService<FundCredentialsService>();

            services.AddDbContext<FundContext>((sp, options) =>
            {
                var creds = sp.GetService<FundCredentials>().Credentials;
                var connectionString = creds.ToSqlConnectionString(fundConfig.Host);

                //options.UseLazyLoadingProxies();
                //Connect to postgresql database.

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
