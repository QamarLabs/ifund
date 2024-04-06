namespace QamarLabs.Microservices.FundEntities
{
    internal interface IFundContextFactory
    {
        public FundContext CreateDbContext();
    }
}
