using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fund_entities
{
    // we need to be able to pass in options without models already generated. 
    // this constructor exists in the other partial class tahts generated...
    public FundContext(DbContextOptions<FundContext> options, object lol)
        : base(options)
    { }

    /// <summary>
    /// The process that is using this context (CronBoss, API Server, etc.).
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
