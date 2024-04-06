using Microsoft.EntityFrameworkCore;

namespace QamarLabs.Microservices.FundEntities
{
    public class FundContext : DbContext
    {
        // we need to be able to pass in options without models already generated. 
        // this constructor exists in the other partial class that generated...
        public FundContext(DbContextOptions<FundContext> options)
            : base(options)
        { }

        /// <summary>
        /// The process that is using this context
        /// </summary>
        public string Process { get; set; } = "Microservices";

        /// <summary>
        /// Optional scope that the context is being executed in.
        /// If set, is displayed as part of the <see cref="DefaultCallingUser"/>.
        /// </summary>
        public string Scope { get; set; }

        /// <summary>
        /// Default value to be used for the universal <c>sql_created_by</c> and <c>sql_modified_by</c> columns.
        /// </summary>
        public string DefaultCallingUser
        {
            get { return string.IsNullOrEmpty(Scope) ? Process : $"{Process} - {Scope}"; }
        }

        public object Enums { get; set; }
    }
}
