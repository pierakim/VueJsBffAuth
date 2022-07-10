using IdentityServer;
using Microsoft.AspNetCore.HttpOverrides;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

Log.Information("Starting up");

try
{
    var builder = WebApplication.CreateBuilder(args);

    //var apiCorsPolicy = "ApiCorsPolicy";
    //builder.Services.AddCors(options =>
    //{
    //    options.AddPolicy(name: apiCorsPolicy,
    //                      builder =>
    //                      {
    //                          builder.WithOrigins("https://localhost:7051")
    //                            .AllowAnyHeader()
    //                            .AllowAnyMethod()
    //                            .AllowCredentials();
    //                            //.WithMethods("OPTIONS", "GET");
    //                      });
    //});

    builder.Host.UseSerilog((ctx, lc) => lc
        .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
        .Enrich.FromLogContext()
        .ReadFrom.Configuration(ctx.Configuration));

    var app = builder
        .ConfigureServices()
        .ConfigurePipeline();

    app.Run();
}
catch (Exception ex)
{
    if (ex.GetType().Name != "StopTheHostException")
    {
        Log.Fatal(ex, "Unhandled exception");
    }
}
finally
{
    Log.Information("Shut down complete");
    Log.CloseAndFlush();
}