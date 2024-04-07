using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QamarLabs.Microservices.FundEntities.Extensions
{
    public static class DbContextExtensions
    {
        public static DbConnectionFromContext GetDbConnection(this DbContext context)
        {
            return new DbConnectionFromContext(context);
        }
    }

    //<summary>
    //Provide a copy of db context, if it's not open. We open it using this class.
    //</summary>
    public sealed class DbConnectionFromContext : IDisposable, IAsyncDisposable
    {

        public DbConnection DbConnection { get; private set; }

        private bool OpenedSelf { get; set; }
        private bool disposedValue { get; set; }

            
        public DbConnectionFromContext(DbContext context)
        {
            DbConnection = context.Database.GetDbConnection();

            if (DbConnection.State != System.Data.ConnectionState.Open)
            {
                DbConnection.Open();
                OpenedSelf = true;
            }
        }

        public void Close()
        {
            if (OpenedSelf && (DbConnection.State == System.Data.ConnectionState.Open))
            {
                DbConnection?.Close();
            }
        }

        private void Dispose(bool disposing)
        {
            if (disposedValue) return;

            if (disposing)
            {
                Close();
            }

            disposedValue = true;
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        public async ValueTask DisposeAsync()
        {
            if (!disposedValue)
            {
                if (OpenedSelf && (DbConnection.State == System.Data.ConnectionState.Open))
                    await DbConnection.CloseAsync().ConfigureAwait(false);
            }
            Dispose(disposing: false);
            GC.SuppressFinalize(this);
        }
    }
}
