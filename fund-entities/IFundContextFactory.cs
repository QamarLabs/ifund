using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fund_entities
{
    internal interface IFundContextFactory
    {
        public FundContext CreateDbContext();
    }
}
