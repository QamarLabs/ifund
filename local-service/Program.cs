using Microsoft.Extensions.Primitives;
using System.Net.Http;
using System.Text;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();

var app = builder.Build();

app.Run(async (context) =>
{
    var clientFactory = context.RequestServices.GetService<IHttpClientFactory>();
    try
    {
        var originalRequest = context.Request;
        //Remove starting slash in url.
        var requestUrl = new Uri($"http://{originalRequest.Path.Value[1..]}{originalRequest.QueryString.Value}");

        var client = clientFactory.CreateClient();

        var proxyRequest = new HttpRequestMessage(new HttpMethod(originalRequest.Method), requestUrl);
        proxyRequest.Content = new StreamContent(originalRequest.Body);

        originalRequest.Headers.ToList().ForEach(h => 
        {
            proxyRequest.Headers.TryAddWithoutValidation(h.Key, h.Value.ToList());
        });

        if (originalRequest.Headers.ContainsKey("Content-Type"))
            proxyRequest.Content.Headers.TryAddWithoutValidation("Content-Type", originalRequest.Headers["Content-Type"].ToList());

        proxyRequest.Headers.Host = requestUrl.Host;

        //Dispose request therefore release resources after the request is finished.
        using (var proxyResponse = await client.SendAsync(proxyRequest, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted))
        {
            var outResponse = context.Response;
            context.Response.StatusCode = (int)proxyResponse.StatusCode;
            proxyResponse.Headers.ToList().ForEach(h => outResponse.Headers[h.Key] = new StringValues(h.Value.ToArray()));
            proxyResponse.Content.Headers.ToList().ForEach(h => outResponse.Headers[h.Key] = new StringValues(h.Value.ToArray()));
            outResponse.Headers.Remove("transfer-encoding");

            await proxyResponse.Content.CopyToAsync(context.Response.Body);
        }
    }
    catch(Exception ex)
    {
        context.Response.StatusCode = 500;
        await context.Response.Body.WriteAsync(Encoding.UTF8.GetBytes(ex.ToString()));
    }
});
