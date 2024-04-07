using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static QamarLabs.Microservices.FundEntities.Extensions.FundContextExtensions;

namespace QamarLabs.Microservices.FundEntities.Extensions
{
    // <summary>
    // Series of extension of overrides to fix bugs in the context class that is auto generated.
    // </summary>
    public static class FundContextExtensions
    {
        //SQL LITE SUPPORT
        private static bool IsSqlLite = false;


        /// <summary>
        /// Overrides the <see cref="RelationalPropertyBuilderExtensions.HasComputedColumnSql(PropertyBuilder, string?, bool?)"/> extension
        /// and replaces TSQL specific syntax with SQLite supported alternatives.
        /// </summary>
        /// <typeparam name="TProperty"></typeparam>
        /// <param name="propertyBuilder"></param>
        /// <param name="sql"></param>
        /// <param name="stored"></param>
        /// <returns></returns>
        public static PropertyBuilder<TProperty> HasComputedColumnSql<TProperty>(
                this PropertyBuilder<TProperty> propertyBuilder,
                string sql,
                bool stored)
        {
            if (IsSqlLite && !string.IsNullOrEmpty(sql))
            {
                if (sql.Contains("CONVERT([date]") || sql.Contains("CONVERT([datetime]"))
                {
                    // SQLite does not have a DATE type (everything in SQLite is a string). So no action needed.
                    return propertyBuilder.HasComment("");
                }
                else
                {
                    sql = sql.Replace("TRY_CAST", "CAST");
                    sql = sql.Replace("json_value", "json_object");
                }
            }

            return propertyBuilder.HasComputedColumnSql(sql, (bool?)stored);
        }


        // ---------------------------------------------------------------------------------
        // Triggered Table Support (ENG-12840)
        // ---------------------------------------------------------------------------------

        /**
         * A change was introduced in EF Core 7 which, by default, breaks tables with triggers:
         * 
         * https://learn.microsoft.com/en-us/ef/core/what-is-new/ef-core-7.0/breaking-changes#sql-server-tables-with-triggers-or-certain-computed-columns-now-require-special-ef-core-configuration
         * 
         * To unbreak the table you have to invoke the TableBuilder.HasTrigger method during model construction.
         * However, as all of our models are auto-generated we can not do this within the main HalContext.cs file.
         * 
         * We know that every table that has a trigger on it has a corresponding message in its table comment.
         * So we override the TableBuilder.HasComment method with our own implementation, using the HalTableBuilder implementation.
         * This override checks the incoming comment for that message, and if that message is present it calls HasTrigger.
         * 
         * But in order to use our HalTableBuilder implementation we have to also override the ToTable extension.
         * With the ToTable method overridden we can then inject our custom table builder.
         */

        private const string TriggeredTableFlag = "This table has one or more triggers.";

        public static EntityTypeBuilder<TEntity> ToTable<TEntity>(
            this EntityTypeBuilder<TEntity> entityTypeBuilder,
            string name,
            Action<TableBuilder<TEntity>> buildAction)
            where TEntity : class
        {
            entityTypeBuilder.Metadata.SetTableName(name);
            entityTypeBuilder.Metadata.SetSchema(null);
            buildAction(new FundTableBuilder<TEntity>(StoreObjectIdentifier.Table(name, entityTypeBuilder.Metadata.GetSchema()), entityTypeBuilder));

            return null;
        }

        // Use a sealed class that can't be inherited by other classes.
        // Inherits from a another class that also takes the same generics passed into the sub class, this class is TableBuilder.
        //
        public sealed class FundTableBuilder<TEntity>: TableBuilder<TEntity> where TEntity : class
        {
            public FundTableBuilder(in StoreObjectIdentifier? storeObject, EntityTypeBuilder<TEntity> entityTypeBuilder)
                : base(storeObject, entityTypeBuilder)
            {

            }

            public override FundTableBuilder<TEntity> HasComment(string? comment)
            {
                var builder = (FundTableBuilder<TEntity>)base.HasComment(comment);

                if(comment?.Contains(TriggeredTableFlag) == true)
                {
                    builder.HasTrigger($"{Name}_Trigger");
                }

                return builder;
            }
        }

    }
}
