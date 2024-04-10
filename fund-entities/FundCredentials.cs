using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace QamarLabs.Microservices.FundEntities
{
    public class FundCredentials
    {
        private IConfiguration Configuration { get; }
//        private IAmazonSecretsManager SecretsManager { get; }

        private FundSecret _Credentials = null;

        public FundSecret Credentials
        {
            internal set { _Credentials = value; }
            get
            {
                if (_Credentials != null)
                    return _Credentials;

                // creds are being used before service could refresh the the creds
                var fundConfig = Configuration.GetFundConfig();
                /*
                var secretRes = SecretsManager.GetSecretValueAsync(new GetSecretValueRequest
                {
                    SecretId = fundConfig.SecretName
                }).Result;

                var creds = JsonConvert.DeserializeObject<FundSecret>(secretRes.SecretString);

                _Credentials = new FundSecret
                {
                    DefaultDatabase = creds.DefaultDatabase,
                    Username = creds.Username,
                    Password = creds.Password
                };
                */

                return _Credentials;
            }
        }

        /*
        public FundCredentials(IConfiguration configuration, IAmazonSecretsManager sm)
        {
            this.Configuration = configuration;
            this.SecretsManager = sm;
        }
        */
    }
}
